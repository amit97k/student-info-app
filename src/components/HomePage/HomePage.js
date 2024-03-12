import React, { useEffect, useRef, useState } from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';

import { SolutionOutlined, DownloadOutlined } from '@ant-design/icons';

import {data} from '../../data'
import StudentTable  from './StudentTable'
import PieChart from './PieChart'
import LineGraph from './LineGraph';

const { Header, Content, Footer } = Layout;

const HomePage = () => {

	const studentRef = useRef(null);
	const [gradeDistribution, setGradeDistribution] = useState({});
	const [joinersData, setJoinersData] = useState({})
	const [leaversData, setLeaversData] = useState({})


	const handlePrint = useReactToPrint({
        content: () => studentRef.current,
		pageStyle: `
		@page {
			size: A4 landscape; // Adjust paper size here
			margin: 20mm; // Adjust margin here
		}
		@media print {
			body {
			zoom: 0.8; // Adjust zoom level to fit content within the printable area
			}
		}`,
    });

	const createPieChartData = () => {
		const grades = {
			A1: 0,
			A2: 0,
			B1: 0,
			B2: 0,
			C1: 0,
			C2: 0,
			D: 0,
			F: 0
		};
	  
		data.forEach(student => {
			const totalMarks = Object.values(student.grades).reduce((acc, curr) => acc + curr, 0);
			const averageMarks = totalMarks / Object.keys(student.grades).length;
		
			if (averageMarks >= 95) {
				grades.A1++;
			} else if (averageMarks >= 90) {
				grades.A2++;
			} else if (averageMarks >= 80) {
				grades.B1++;
			} else if (averageMarks >= 70) {
				grades.B2++;
			} else if (averageMarks >= 60) {
				grades.C1++;
			} else if (averageMarks >= 50) {
				grades.C2++;
			} else if (averageMarks >= 40) {
				grades.D++;
			} else {
				grades.F++;
			}
		});

		setGradeDistribution(grades)
	}

	const createLineChartData = () => {
		const joiners = {};
    	const leavers = {};

		data.forEach(({ joiningDate, leavingDate }) => {
			const joinDay = new Date(joiningDate).toLocaleDateString();
			const leaveDay = leavingDate ? new Date(leavingDate).toLocaleDateString() : null;

			if (joinDay in joiners) {
				joiners[joinDay]++;
			} else {
				joiners[joinDay] = 1;
			}

			if (leaveDay) {
				if (leaveDay in leavers) {
				leavers[leaveDay]++;
				} else {
				leavers[leaveDay] = 1;
				}
			}
		});

		setJoinersData(joiners)
		setLeaversData(leavers);
	}

	useEffect(()=> {
		createPieChartData();
		createLineChartData();
	}, [data])

	return (
		<>
			<div  ref={studentRef}>
				<Layout>
					<Header style={{ position: 'fixed', zIndex:1, width: '100%', color:'yellow' }}>
						<div>
							<div style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									fontSize: 18,
									fontWeight: 'bold',
								}}
							>
								<span> <SolutionOutlined /> Student Info App </span>
								<Button
									style={{
										borderColor: 'green',
										background: '#bdd9ba',
									}}
									onClick={handlePrint}
									icon={<DownloadOutlined />}
								/>
							</div>
						</div>
					</Header>
					<Content>
						<div>
							<Row style={{paddingTop:80}}>
								<Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<Card hoverable style={{width: '90%', }}>
										<div style={{height:'250px'}}>
											<PieChart data={gradeDistribution}/>
										</div>
									</Card>
								</Col>
								<Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<Card hoverable style={{width: '90%', }}>
										<div style={{height:'250px'}}>
											<LineGraph joiners={joinersData} leavers={leaversData}/>
										</div>
									</Card>
								</Col>
							</Row>

							<Row>
								<Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:5, paddingBottom:50 }}>
									<Card hoverable style={{width: '95%'}}>
										<StudentTable data={data}/>
									</Card>
								</Col>
							</Row>
							
						</div>
					</Content>
					<Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
						React App ©{new Date().getFullYear()} Created by Amit
					</Footer>
				</Layout>
			</div>
			
		</>
			
	);
};

export default HomePage;