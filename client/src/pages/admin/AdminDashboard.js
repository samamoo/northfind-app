import React, { useEffect, useState } from 'react';
import Progressbar from '../../components/Progressbar';
import { weightedAverage } from '../../helpers/helpers';
import axios from 'axios';
import './AdminDashboard.scss';

export default function AdminDashboard() {
  const [groups, setGroups] = useState({
    process:[],
    performanceMeasurement:[],
    organization:[],
    tools:[],
  });
  const [groupScore, setGroupScore] = useState({
    process:0,
    performanceMeasurement:0,
    organization:0,
    tools:0,
  });
  const [processElement, setProcessElement] = useState({
    portfolioReview:0,
    demandPlanning:0,
    supplyPlanning:0,
    integratedReconciliation:0,
    executiveSOP:0,
    cycleTime:0,
  });
  const [organizationElement, setOrganizationElement] = useState({
    organizationAlignment:'',
    trainingEducation:'',
    standardization:'',
  });
  const [toolsElement, setToolsElement] = useState({
    systemControls:'',
    systemsFunctionality:'',
  });

  
  const filterGroup = () => {
    filterProcessGroups(groups.process);
    filterOrgGroups(groups.organization);
    filterToolsGroups(groups.tools);
  };
  useEffect(() => {
    (async () => {
      const data = await fetchData();//gets data from db
      setGroups((prev) => ({...prev, process: data[1], performanceMeasurement: data[0], organization: data[2], tools: data[3]})); //sets the group state
      getScores(data); //generates scores and sets the scores state
    })();
  },[]);

  useEffect(() => {
    filterGroup();
  },[groups])


  const fetchData = async () => {
    const data = await axios.get("http://localhost:9000/api/session-questions/")
    .then((promise => {
      return promise.data;
    }))
    return data;
  };

// Filter individual groups
  const filterProcessGroups = (array) => {
    let portRev = [];
    let demPlan = [];
    let supPlan = [];
    let intRec = [];
    let execSOP = [];
    let cycleT = [];
    for (const item of array) {
      if (item.area_id === 8) {
        portRev.push(item);
      }
      if (item.area_id === 9) {
        demPlan.push(item);
      }
      if (item.area_id === 10) {
        supPlan.push(item);
      }
      if (item.area_id === 11) {
        intRec.push(item);
      }
      if (item.area_id === 12) {
        execSOP.push(item);
      }
      if (item.area_id === 13) {
        cycleT.push(item);
      }
    }
    const portRevScore = weightedAverage(portRev);
    const demPlanScore = weightedAverage(demPlan);
    const supPlanScore = weightedAverage(supPlan);
    const intRecScore = weightedAverage(intRec);
    const execSOPScore = weightedAverage(execSOP);
    const cycleTScore = weightedAverage(cycleT);
    setProcessElement({...processElement, portfolioReview: portRevScore, demandPlanning: demPlanScore, supplyPlanning: supPlanScore, integratedReconciliation: intRecScore, executiveSOP: execSOPScore, cycleTime: cycleTScore});
  };

  const filterOrgGroups = (array) => {
    let orgAli = [];
    let trainEd = [];
    let stnd = [];
    for (const item of array) {
      if (item.area_id === 14) {
        orgAli.push(item)
      }
      if (item.area_id === 15) {
        trainEd.push(item);
      }
      if (item.area_id === 16) {
        stnd.push(item);
      }
    }
    const orgAliScore = weightedAverage(orgAli);
    const trainEdScore = weightedAverage(trainEd);
    const stndScore = weightedAverage(stnd);
    setOrganizationElement({...organizationElement, organizationAlignment: orgAliScore, trainingEducation: trainEdScore, standardization: stndScore});
  };
  const filterToolsGroups = (array) => {
    let sysCon = [];
    let sysFunct = [];
    for (const item of array) {
      if (item.area_id === 17) {
        sysCon.push(item)
      }
      if (item.area_id === 18) {
        sysFunct.push(item);
      }
    }
    const sysConScore = weightedAverage(sysCon);
    const sysFunctScore = weightedAverage(sysFunct);
    setToolsElement({...toolsElement, systemControls: sysConScore, systemsFunctionality: sysFunctScore});
  };

  const getScores = (obj) => {
    const pmScore = weightedAverage(obj[0])
    const processScore = weightedAverage(obj[1])
    const orgScore = weightedAverage(obj[2])
    const toolsScore = weightedAverage(obj[3])
    setGroupScore((prev) => ({...prev, performanceMeasurement: pmScore, process: processScore, organization: orgScore, tools: toolsScore}));
  }

  return(
    <main className="dashboard">
      <header className="dashboard-banner">
        <h1>Summary of Results</h1>
      </header>
      <div className="line"></div>
      <table className="group-table">
        <thead>
          <tr>
            <th className="dashboard_table-heading">Group</th>
            <th className="dashboard_table-heading">Assessment Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Performance Measurement</td>
            <td><Progressbar percentage={groupScore.performanceMeasurement}/></td>
          </tr>
          <tr>
            <td>Process</td>
            <td><Progressbar percentage={groupScore.process}/></td>
          </tr>
          <tr>
            <td>Organization</td>
            <td><Progressbar percentage={groupScore.organization}/></td>
          </tr>
          <tr>
            <td>Tools</td>
            <td><Progressbar percentage={groupScore.tools}/></td>
          </tr>
        </tbody>
      </table>
      <table className="process-table">
        <thead>
          <tr>
            <th className="dashboard_table-heading">Process Element</th>
            <th className="dashboard_table-heading">Assessment Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="process-column">Portfolio Review</td>
            <td><Progressbar percentage={processElement.portfolioReview ? processElement.portfolioReview : 0}/></td>
          </tr>
          <tr>
            <td className="process-column">Demand Planning</td>
            <td><Progressbar percentage={processElement.demandPlanning ? processElement.demandPlanning : 0}/></td>
          </tr>
          <tr>
            <td className="process-column">Supply Planning</td>
            <td><Progressbar percentage={processElement.supplyPlanning ? processElement.supplyPlanning : 0}/></td>
          </tr>
          <tr>
            <td className="process-column">Integrated Reconciliation</td>
            <td><Progressbar percentage={processElement.integratedReconciliation ? processElement.integratedReconciliation : 0}/></td>
          </tr>
          <tr>
            <td className="process-column">Executive S&OP</td>
            <td><Progressbar percentage={processElement.executiveSOP ? processElement.executiveSOP : 0}/></td>
          </tr>
          <tr>
            <td className="process-column">Cycle Time</td>
            <td><Progressbar percentage={processElement.cycleTime ? processElement : 0}/></td>
          </tr>
        </tbody>
      </table>
      <table className="org-table">
        <thead>
          <tr>
            <td className="dashboard_table-heading">Organization Element</td>
            <td className="dashboard_table-heading">Assessment Score</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="org-column">Organizational Alignment</td>
            <td><Progressbar percentage={organizationElement.organizationAlignment ? organizationElement.organizationAlignment : 0}/></td>
          </tr>
          <tr>
            <td className="org-column">Training & Education</td>
            <td><Progressbar percentage={organizationElement.trainingEducation ? organizationElement.trainingEducation : 0}/></td>
          </tr>
          <tr>
            <td className="org-column">Standardization & Continuous Improvement</td>
            <td><Progressbar percentage={organizationElement.standardization ? organizationElement.standardization : 0}/></td>
          </tr>
        </tbody>
      </table>
      <table className="tools-table">
        <thead>
          <tr>
            <th className="dashboard_table-heading">Tools Element</th>
            <th className="dashboard_table-heading">Assessment Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tools-column">Systems Control</td>
            <td><Progressbar percentage={toolsElement.systemControls ? toolsElement.systemControls : 0}/></td>
          </tr>
          <tr>
            <td className="tools-column">Systems Functionality</td>
            <td><Progressbar percentage={toolsElement.systemsFunctionality ? toolsElement.systemsFunctionality : 0}/></td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}