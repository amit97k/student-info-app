import React, { useState } from 'react';
import { Table, Modal } from 'antd';

import StudentInfoPage from '../StudentInfoPage/StudentInfoPage';
import { gradeCalculation } from '../../util/gradeCalculator'

const StudentTable = ({data}) => {
    
    const [visible, setVisible] = useState(false)

    const [student, setStudent] = useState({})

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <>
            <div>
                <Table dataSource={data}
                    pagination={
                        {
                            pageSizeOptions: ['5','10','25','50','75', data.length],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            defaultPageSize: 5
                        }
                    }
                    size="small"
                >
                    <Table.Column
                        title="ID"
                        dataIndex="id"
                        key="id"
                        render={(text, row) => (
                            <span style={{fontWeight:'bold', color:'#0377fc'}} onClick={() => {
                                setVisible(true)
                                setStudent(row)
                            }}> {row.id}</span>
                        )}
                        width={'10%'}
                        align='center'
                    />
                    <Table.Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                        sorter = {(a, b) => a.name.localeCompare(b.name)}
                        render={(text) => (
                            <span> {text}</span>
                        )}
                        width={'20%'}
                        align='center'
                    />
                    <Table.Column
                        title="Age"
                        dataIndex="age"
                        key="age"
                        width={'10%'}
                        align='center'
                        sorter = {(a, b) => a.age - b.age}
                    />
                    <Table.Column
                        title="Grade"
                        width={'20%'}
                        align='center'
                        render={(text, row) => (
                            <span style={{fontWeight:'bold'}}>{gradeCalculation(row?.grades)}</span>
                        )}
                    />
                    <Table.Column
                        title="Joining Date"
                        dataIndex="joiningDate"
                        key="joiningDate"
                        align='center'
                        width={'20%'}
                    />
                        <Table.Column
                        title="Leaving Date"
                        dataIndex="leavingDate"
                        key="leavingDate"
                        align='center'
                        width={'20%'}
                    />
                </Table>
            </div>
            

            <Modal
                open={visible}
                onCancel={handleCancel}
                centered
                width={450}
                footer={null}
            >
                <StudentInfoPage student={student}/>
            </Modal>
        </>
    )

}

export default StudentTable;