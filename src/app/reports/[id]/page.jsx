import ReportDetails from '@/components/shared/ReportDetails';
import { getReport } from '@/lib/fetchData';
import React from 'react';

const ReportDetailsPage = async({params}) => {
  const {id} = await params;
  const reportData=await getReport(id);
  console.log("report data",reportData);
    return (
        <div>
            <ReportDetails report={reportData}/>
        </div>
    );
};

export default ReportDetailsPage;