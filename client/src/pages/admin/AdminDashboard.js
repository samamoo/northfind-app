import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard(props) {
  const [groups, setGroups] = useState({
    process:'',
    performanceMeasurement:'',
    organization:'',
    tools:'',
  });
  const [groupScore, setGroupScore] = useState({
    process:'',
    performanceMeasurement:0,
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

  useEffect(() => {
    axios.get("http://localhost:9000/api/session-questions/")
    .then((res) => {
      setGroups((prev) => ({...prev, performanceMeasurement: res.data.perfMeas, process: res.data.process, organization: res.data.organization, tools: res.data.tools}))
      getScores();
    })
  },[]);

  const weightedAverage = (arr) => {
    // Loop through an array of a group
    // Add all of the items' scores
    // Add all of the items' weight
    // Divide scores sum by weight sum to get weighted avg of that group.
    let weightedAvg = 0;
    let sumOfWeights = 0;
    let sumOfScores = 0;
    if (arr === []) {
      return 0;
    }
    for (const item of arr) {
      sumOfScores = sumOfScores + item.score;
      sumOfWeights = sumOfWeights + item.weight;
    }
    weightedAvg = sumOfScores / sumOfWeights;
    parseFloat(weightedAvg).toFixed(2)
    return weightedAvg;
  }
  
  const getScores = () => {
    const pmScore = weightedAverage(groups.performanceMeasurement)
    console.log(pmScore)
    // const processScore = weightedAverage(groups.process)
    // const orgScore = weightedAverage(groups.organization)
    // const toolsScore = weightedAverage(groups.tools)
    // setGroupScore((prev) => ({...prev, performanceMeasurement: pmScore}));
    setGroupScore({...groupScore, performanceMeasurement: pmScore})
  }

  console.log(groups)
  console.log(groupScore)

  return(
    <main className="clientform">
      <h1>The Dashboard</h1>
    </main>
  )
}