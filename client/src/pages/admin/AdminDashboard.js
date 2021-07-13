import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard(props) {
  const [groupScore, setGroupScore] = useState({
    process:'',
    performanceMeasurement:'',
    organization:'',
    tools:'',
  });
  const [processElement, setProcessElement] = useState({
    productManagement:'',
    demandPlanning:'',
    supplyPlanning:'',
    integratedReconciliation:'',
    executiveSOP:'',
    cycleTime:'',
  });
  const [organizationElement, setOrganizationElement] = useState({
    organizationAlignment:'',
    trainingEducation:'',
    standardization:'',
  });
  const [toolsElement, setToolsElement] = useState({
    systemControls:'',
    systemsFunctionality:'',
  })

  // useEffect(() => {
  //   axios.get("http://localhost:9000/api/session-questions/")
  // },[])

  return(
    <main className="clientform">
      <h1>The Dashboard</h1>
    </main>
  )
}