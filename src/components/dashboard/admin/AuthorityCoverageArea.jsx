'use client'
import React, { useEffect, useState } from 'react';
import { HiOutlineMapPin } from 'react-icons/hi2';

const AuthorityCoverageArea = ({ authority }) => {
    const [division, setDivision] = useState(null);
    const [district, setDistrict] = useState(null);
    const [upazila, setUpazila] = useState(null);

    useEffect(() => {
        const fetchLocationData = async () => {
            if (authority?.coverage?.divisionId) {
                const divisionRes = await fetch(
                    `https://bdapi.vercel.app/api/v.1/division`
                );

                const divisionData = await divisionRes.json();

                const foundDivision = divisionData.data.find(
                    (item) => item.id === authority.coverage.divisionId
                );

                setDivision(foundDivision);
            }

            if (authority?.coverage?.districtId) {
                const districtRes = await fetch(
                    `https://bdapi.vercel.app/api/v.1/district/${authority.coverage.divisionId}`
                );

                const districtData = await districtRes.json();

                const foundDistrict = districtData.data.find(
                    (item) => item.id === authority.coverage.districtId
                );

                setDistrict(foundDistrict);
            }
            if (authority?.coverage?.upazilaId) {
                const upazilaRes = await fetch(
                    `https://bdapi.vercel.app/api/v.1/upazilla/${authority.coverage.districtId}`
                );

                const upazilaData = await upazilaRes.json();

                const foundUpazila = upazilaData.data.find(
                    (item) => item.id === authority.coverage.upazilaId
                );

                setUpazila(foundUpazila);
            }
        };

        fetchLocationData();
    }, []);
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#0F6848]">
                    <HiOutlineMapPin className="text-xl" />
                </div>

                <div>
                    <h2 className="font-semibold text-gray-900">
                        Coverage Area
                    </h2>
                    <p className="text-sm text-gray-500">
                        Geographic area covered by this authority
                    </p>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="text-sm text-gray-500">Coverage Level</p>
                    <p className="mt-1 font-medium text-gray-900">
                        {authority.coverage?.level}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Division</p>
                    <p className="mt-1 font-medium text-gray-900">
                        {division?.name || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="mt-1 font-medium text-gray-900">
                        {district?.name || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Upazila / Thana</p>
                    <p className="mt-1 font-medium text-gray-900">
                         {upazila?.name || "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthorityCoverageArea;