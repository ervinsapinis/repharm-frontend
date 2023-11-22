import React, { useState, useEffect } from 'react';
import {
    Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox
} from '@mui/material';
import backendService from './backend-service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PatientForm = ({ open, handleClose }) => {
    const [patientData, setPatientData] = useState({
        personCode: '',
        name: '',
        surname: '',
        dateBirth: '',
        sex: '',
        doctorId: '',
    });
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const doctorsData = await backendService.getDoctors();
            setDoctors(doctorsData);
        };

        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await backendService.createPatient(patientData);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Personas kods"
                    name="personCode"
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Vārds"
                    name="name"
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Uzvārds"
                    name="surname"
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    type="date"
                    name="dateBirth"
                    label="Dzimšanas datums"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Dzimums</InputLabel>
                    <Select
                        value={patientData.sex}
                        label="Dzimums"
                        name="sex"
                        onChange={handleInputChange}
                    >
                        <MenuItem value="001">Vīrietis</MenuItem>
                        <MenuItem value="002">Sieviete</MenuItem>
                        <MenuItem value="98">Cits</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Ārsts</InputLabel>
                    <Select
                        value={patientData.doctorId}
                        label="Ārsts"
                        name="doctorId"
                        onChange={handleInputChange}
                    >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor.id} value={doctor.id}>
                                {doctor.name} {doctor.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Pievienot pacientu
                </Button>
            </Box>
        </Modal>
    );
};

export default PatientForm;
