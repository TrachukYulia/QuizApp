import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Center from './Center'
// import useForm from '../hooks';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useForm from '../hooks/useForm';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const getFreshModel = () => ({
    name: '',
    email: ''
})
export default function Login() {
    // const [value.setValues]  = useState(){
    const { context, setContext, resetContext } = useStateContext();
    // }
    const navigate = useNavigate()
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);
    

    useEffect (() => {
       resetContext()
    }, [])
    const login = e => {
        e.preventDefault();
        if (validate())
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then(res => {
                    setContext({ participantId: res.data.participantId })
                    navigate('/quiz')
                    // console.log(context);
                })
                .catch(err => console.log(err))
    }
    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.name = values.name != "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    return (
        <Center>
            {context.participantId}
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant='h3' sx={{ my: 3 }}> Quiz App</Typography>
                    <Box sx={
                        {
                            '& .MuiTextField-root':
                            {
                                margin: 1,
                                width: '90%'
                            }
                        }
                    }>
                        <form noValidate onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant='outlined'
                                {...(errors.email && { error: true, helperText: errors.email })}
                            // error= {true}
                            // helperText = ".."
                            />
                            <TextField
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant='outlined'
                                {...(errors.name && { error: true, helperText: errors.name })}

                            />

                            <Button
                                type="submit"
                                variant='contained'
                                size="large"
                                sx={{ width: '90%' }}> Start </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}