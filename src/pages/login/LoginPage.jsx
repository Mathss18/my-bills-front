import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Divider, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const initialValues = {
    email: '',
    senha: '',
}

const useStyles = makeStyles((theme) => ({
    input: {
        backgroundColor: '#fff',
        // Estilo do helperText
        '& p': {
            backgroundColor: "#fafafa",
            margin: 0,
            paddingLeft: theme.spacing(1)
        },
    },
    saveButton: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#fff',
            color: theme.palette.primary.main,
        },
    },
    cancelButton: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#fff',
            color: theme.palette.error.main,
        },
    },
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

function LoginPage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function handleOnSubmit(event) {
        event.preventDefault();

         api.post('/login', values)
        .then(response => {
            console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
            history.push("/")
        })
        .catch(error => {
            alert(error.response.data.mensagem)
        })
        
    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleOnSubmit}>
                <br />
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                    <LocationOnIcon />
                    <h3>Login</h3>
                </div>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Email" fullWidth className={classes.input} name="email" value={values.email} onChange={handleOnChange} />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Senha" fullWidth className={classes.input}  name="senha" value={values.senha} onChange={handleOnChange} />

                    </Grid>

                </Grid>

                <Grid container spacing={0}>
                    <Grid item>
                        <Button type="submit" variant="outlined" startIcon={<CheckIcon />} className={classes.saveButton}>Entrar</Button>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
}

export default LoginPage