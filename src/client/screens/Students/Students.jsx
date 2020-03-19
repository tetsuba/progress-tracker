import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// COMPONENTS
import { Button, Col, Container, ListGroup, Row} from 'react-bootstrap';
import AddStudentModal from '../../components/Modal/AddStudentModal';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// CONTEXT
import { ModalContext } from '../../components/Modal/ModalContext';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

export const STUDENTS_QUERY = gql`
    {
        students {
            id
            firstName
            lastName
            teacherID
        }
    }
`;


const Students = () => {
    const { loading, data } = useQuery(STUDENTS_QUERY);
    const { toggleModal, addTemplate } = useContext(ModalContext);
    const crumbs = [
        { path: '/', name: 'Home' },
        { path: '', name: 'Students' },
    ];

    useEffect(() => {
        addTemplate(AddStudentModal);
    }, [addTemplate]);

    const renderList = (students) => students.map((student) => (
        <Link
            to={`/student/${student.id}`}
            key={student.id}
            className='list-group-item'
        >
            {student.firstName} {student.lastName}
        </Link>
    ));

    return (
        <Container>
                <Row className="mt-5">
                    <BreadCrumbs crumbs={crumbs} />
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h1>My Students</h1>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>

                        <Button
                            className="float-right"
                            variant="primary"
                            onClick={() => toggleModal()}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Add Student
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <ListGroup>
                            { !loading && renderList(data.students) }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
    )
};

export default Students;
