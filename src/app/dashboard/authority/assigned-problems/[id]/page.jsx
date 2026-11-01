import ReportDetails from '@/components/shared/ReportDetails';
import { getReport } from '@/lib/fetchData';
import React from 'react';

const ProblemDetailsPage = async({params}) => {
  const {id} = await params;
  const reportData=await getReport(id);
  console.log(reportData);
    return (
        <div>
            <ReportDetails report={reportData}/>
        </div>
    );
};

export default ProblemDetailsPage;