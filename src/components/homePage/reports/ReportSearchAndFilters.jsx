"use client";

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";

import {
  Autocomplete,
  Label,
  ListBox,
  SearchField,
  EmptyState,
  useFilter,
} from "@heroui/react";

const ReportSearchAndFilters = ({ filters, onFiltersChange }) => {
  const [upazilas, setUpazilas] = useState([]);
  const [loadingUpazilas, setLoadingUpazilas] = useState(false);
  const [upazilaSearch, setUpazilaSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const { contains } = useFilter({
    sensitivity: "base",
  });

  useEffect(() => {
    const fetchUpazilas = async () => {
      setLoadingUpazilas(true);

      const res = await fetch(
        "https://bdapi.vercel.app/api/v.1/upazilla"
      );

      const result = await res.json();

      setUpazilas(result.data || []);
      setLoadingUpazilas(false);
    };

    const fetchCategories = async()=>{
      setLoadingCategories(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/problemCategories`);
      const data = await res.json();
      setCategories(data);
      setLoadingCategories(false);
    }

    fetchUpazilas();
    fetchCategories();
  }, []);

  const filteredUpazilas = upazilas.filter((item) =>
    item.name?.toLowerCase().includes(upazilaSearch.trim().toLowerCase())
  );

  const filterButtonClass =
    "h-12 w-full min-w-0 rounded-xl border border-[#D5EADF] bg-white px-3 text-sm text-[#244B3A] shadow-sm outline-none transition hover:border-[#0F6848] hover:bg-[#F7FBF8] focus:border-[#0F6848] focus:ring-2 focus:ring-[#0F6848]/10 disabled:cursor-not-allowed disabled:bg-gray-100";

  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (

    <div className="flex flex-col gap-3 lg:flex-row lg:items-center pb-4">
      <div className="relative min-w-0 flex-1">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F6848]" />

        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          placeholder="Search by problem title or reporter name..."
          aria-label="Search by problem title or reporter name"
          className="h-12 w-full rounded-xl border border-[#D5EADF] bg-[#F7FBF8] py-2 pl-11 pr-4 text-sm text-[#244B3A] outline-none transition placeholder:text-[#8BA397] focus:border-[#0F6848] focus:ring-2 focus:ring-[#0F6848]/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[570px] lg:shrink-0">
        <div className="relative min-w-0">

          <div className="min-w-0">
            <Autocomplete
              className="w-full"
              placeholder="All Upazilas"
              value={filters.upazila}
              onChange={(key) =>
                handleFilterChange(
                  "upazila",
                  key == null ? "" : String(key)
                )
              }
              isDisabled={loadingUpazilas}
            >
              <Label className="sr-only">Filter by upazila</Label>

              <Autocomplete.Trigger
                className="h-12 w-full rounded-xl border border-[#D5EADF] bg-white px-3 text-sm text-[#244B3A] shadow-sm hover:border-[#0F6848]"
              >
                <Autocomplete.Value />
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>

              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField
                    autoFocus
                    aria-label="Search upazilas"
                    name="upazila-search"
                    variant="secondary"
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search upazila..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>

                  <ListBox
                    renderEmptyState={() => (
                      <EmptyState>No upazila found</EmptyState>
                    )}
                  >
                    <ListBox.Item id="" textValue="All Upazilas">
                      All Upazilas
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    {upazilas.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={String(item.id)}
                        textValue={item.name}
                      >
                        {item.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
          </div>

        </div>

        <div className="relative min-w-0">
          <select
            value={filters.category}
            onChange={(e) =>
              handleFilterChange("category", e.target.value)
            }
            aria-label="Filter by category"
            className={`${filterButtonClass} appearance-none pr-7`}
            disabled={loadingCategories}
          >
            <option value="">
              {loadingCategories
                ? "Loading categories..."
                : "All Categories"}
            </option>

            {categories.map((item) => {
              const id = item._id || item.id;
              const name = item.name || item.categoryName;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#557065]" />
        </div>

        <div className="relative min-w-0">
          <select
            value={filters.priority}
            onChange={(e) =>
              handleFilterChange("priority", e.target.value)
            }
            aria-label="Filter by priority"
            className={`${filterButtonClass} appearance-none pr-7`}
          >
            <option value="">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="critical">Critical Priority</option>
          </select>

          <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#557065]" />
        </div>
      </div>
    </div>

  );
};

export default ReportSearchAndFilters;