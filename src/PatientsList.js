import React, { useState, useEffect } from 'react';
import backendService from "./backend-service";
import PatientForm from "./AddPatientForm";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);


    useEffect(() => {
        const fetchPatientsAndDoctors = async () => {
            try {
                const doctorsData = await backendService.getDoctors();
                setDoctors(doctorsData ?? []);

                const patientsData = await backendService.getPatients(selectedDoctorId);
                setPatients(patientsData ?? []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientsAndDoctors();
    }, [selectedDoctorId]);

    if (loading) {
        return <CircularProgress/>;
    }

    const handleDoctorChange = (event) => {
        setSelectedDoctorId(event.target.value);
    };

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };


    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenForm}>
                Pievienot jaunu pacientu
            </Button>
            <PatientForm open={isFormOpen} handleClose={handleCloseForm} />
            <Select
                value={selectedDoctorId}
                onChange={handleDoctorChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="">
                    <em>Atlasīt pacientus pēc Daktera</em>
                </MenuItem>
                {doctors?.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name} {doctor.surname}
                    </MenuItem>
                ))}
            </Select>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Vārds</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Uzvārds</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Personas kods</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients?.map((patient, index) => (
                            <TableRow key={patient.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f7f7f7' }}>
                                <TableCell component="th" scope="row">
                                    {patient.name}
                                </TableCell>
                                <TableCell>{patient.surname}</TableCell>
                                <TableCell align="right">{patient.personCode}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PatientsList;
