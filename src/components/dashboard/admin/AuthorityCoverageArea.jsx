'use client'
import React, { useEffect, useState } from 'react';
import { HiOutlineMapPin } from 'react-icons/hi2';
import bd from "bd-geojson";

const AuthorityCoverageArea = ({ authority }) => {
    const [division, setDivision] = useState(null);
    const [district, setDistrict] = useState(null);
    const [upazila, setUpazila] = useState(null);

   useEffect(() => {
    const divisionId = authority?.coverage?.divisionId;
    const districtId = authority?.coverage?.districtId;
    const upazilaId = authority?.coverage?.upazilaId;

    if (divisionId) {
        const foundDivision = bd.getDivisions().find(
            (item) => String(item.id) === String(divisionId)
        );
        setDivision(foundDivision || null);
    }

    if (districtId && divisionId) {
        const foundDistrict = bd.getDistrictsByDivision(divisionId).find(
            (item) => String(item.id) === String(districtId)
        );
        setDistrict(foundDistrict || null);
    }

    if (upazilaId && districtId) {
        const foundUpazila = bd.getUpazilasByDistrict(districtId).find(
            (item) => String(item.id) === String(upazilaId)
        );
        setUpazila(foundUpazila || null);
    }
}, [authority]);
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