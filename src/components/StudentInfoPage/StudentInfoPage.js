// StudentInfoPage.js
import React, { useEffect, useState, useRef } from 'react';
import '../styles/globalStyle.css'
import { useReactToPrint } from 'react-to-print';
import {  Row, Col, Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import { gradeCalculation } from '../../util/gradeCalculator'
const { Meta } = Card;


const StudentInfoPage = ({student}) => {

	const studentInfoRef = useRef(null);
	const handlePrint = useReactToPrint({
        content: () => studentInfoRef.current,
		pageStyle: `
		@page {
			size: A4; // Adjust paper size here
			margin: 50mm; // Adjust margin here
		}
		@media print {
			body {
			zoom: 1; // Adjust zoom level to fit content within the printable area
			}
		}`,
    });

	const [markData, setMarkData] = useState([])

	const createReport = () => {

		let subjectArray = [];
		Object.keys(student.grades).forEach(key => {
			let temp = {
				subject : key,
				mark : student.grades[key],
				max : 100
			}
			subjectArray.push(temp)
		})

		setMarkData(subjectArray)
	}

	useEffect(() => {
		createReport();
	}, [student])

	return (
		<div>
			<div style={{paddingLeft:10}}>
				<Button
					style={{
						borderColor:'green',
						background:'#bdd9ba'
					}}
						onClick={handlePrint}
						icon={<DownloadOutlined/>}
				/>
			</div>
			
			<div ref={studentInfoRef} id='student-card'>
				<Row>
					<Col span={12}>
						<div style={{padding:10, paddingTop:20}}>
							<span style={{fontSize:20, fontWeight:'bold'}}>{student.name}</span><br/>
							<span>Age: {student.age} Y</span><br/>
							<span>Joining Date: {student.joiningDate}</span><br/>
							<span>City: {student.city}</span><br/>
							<span style={{fontWeight:'bold', color:'#a37312'}}>Grade: {gradeCalculation(student.grades)}</span><br/>
							
						</div>
					</Col>
					<Col span={10} style={{paddingLeft:40, paddingTop:20}}>
						<Meta
							avatar={<Avatar src="./blank_image.webp" size={150}/>}
						/>
					</Col>
				</Row>
				
				<Table 
					dataSource={markData} 
					pagination={false} 
					className='studentSubjectTable'
					bordered
					style={{padding:10}}
					summary={(markData) => {
						let totalMarks = 0;
				
						markData.forEach(marks => {
							totalMarks += marks.mark;
						});
				
						return (
							<>
							<Table.Summary.Row>
								<Table.Summary.Cell index={0} align='center'>Total</Table.Summary.Cell>
								<Table.Summary.Cell index={1} align='center'>
								{500}
								</Table.Summary.Cell>
								<Table.Summary.Cell index={2} align='center'>
								{totalMarks}
								</Table.Summary.Cell>
							</Table.Summary.Row>
							</>
						);
						}}
				>
					<Table.Column
						title="Subject"
						dataIndex="subject"
						key="subject"
						align='center'
					/>
					<Table.Column
						title="Max"
						dataIndex="max"
						key="max"
						align='center'
					/>
					<Table.Column
						title="Mark"
						dataIndex="mark"
						key="mark"
						align='center'
					/>
				</Table>
			</div>
		</div>
	)
}

export default StudentInfoPage;