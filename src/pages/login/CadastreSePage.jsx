import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Divider, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { api, parseJwt } from '../../services/api';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Swal from 'sweetalert2';

const initialValues = {
    nome: '',
    email: '',
    senha: '',
    repete_senha: ''
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
        '&:hover': {
            backgroundColor: '#fff',
            color: theme.palette.primary.main,
        },
    },
    signButton: {
        marginTop: theme.spacing(2),
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

function CadastreSePage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function handleOnSubmit(event) {
        event.preventDefault();

         api.post('/usuarios', values)
        .then(response => {
            Swal.fire({
                title: 'Usuário cadastrado com sucesso!',
                html: 'Redirecionando...',
                position: 'center',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    history.push("/")
                }
            })
        })
        .catch(error => {
            Swal.fire({
                title: 'Erro ao cadastrar usuário!',
                html: error.response.data.mensagem,
                position: 'center',
                icon: 'error',
            })
        })
        
    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleOnSubmit}>
                <br />
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                    <LocationOnIcon />
                    <h3>Cadastre-se</h3>
                </div>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Nome" fullWidth className={classes.input} name="nome" value={values.nome} onChange={handleOnChange} />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Email" fullWidth className={classes.input}  name="email" value={values.email} onChange={handleOnChange} />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" variant="outlined" label="Senha" fullWidth className={classes.input}  name="senha" value={values.senha} onChange={handleOnChange} />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" variant="outlined" label="RepeteSenha" fullWidth className={classes.input}  name="repete_senha" value={values.repete_senha} onChange={handleOnChange} />

                    </Grid>

                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Button type="submit" variant="outlined" startIcon={<CheckIcon />} className={classes.saveButton}>Cadastrar</Button>
                    </Grid>
                    <Grid container justifyContent="flex-end" xs={6}>
                        <Button className={classes.signButton} onClick={() => history.push('/login')}>Voltar</Button>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
}

export default CadastreSePage