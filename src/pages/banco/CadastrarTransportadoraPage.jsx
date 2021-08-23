import { useState } from 'react';
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Button, CardMedia } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { api, parseJwt } from '../../services/api';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        backgroundColor: '#fff',
        // Estilo do helperText
        '& p': {
            backgroundColor: "#fafafa",
            margin: 0,
            paddingLeft: theme.spacing(1)
        },
    },
    image: {
        border: "2px solid black",
        borderRadius: '10px',
        height: "200px",
        maxWidth: "500px",
        margin: '10px'
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
}));

const initialValues = {
    nome: '',
    saldo: '',
    logo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    id_usuario: (parseJwt(localStorage.getItem('token'))).id,
}


function CadastrarTransportadoraPage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        console.log(values);
        api.post('/bancos', values)
            .then(response => history.push("/bancos"));
    }

    function handleCapture(event) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = (e) => {
            if (fileReader.readyState === 2) {
                setValues({ ...values, ['logo']: e.target.result });
            }
        };
    };

    return (
        <>
            <TopBar />

            <SideMenu>
                <div>
                    <Divider />
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                        <AssignmentIcon />
                        <h3>Dados Bancarios</h3>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" fullWidth label="Nome do banco" className={classes.input} value={values.nome} name="nome" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" fullWidth label="Saldo Inicial" className={classes.input} value={values.saldo} name="saldo" onChange={handleOnChange} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid container xs={12} sm={4} justifyContent="flex-start">
                                <Button type="submit" variant="outlined" startIcon={<CheckIcon />} className={classes.saveButton}>Salvar</Button>
                            </Grid>
                            <Grid container xs={12} sm={4}></Grid>
                            <Grid container xs={12} sm={4} justifyContent="flex-end">
                                <Button onClick={() => history.push("/bancos")} variant="outlined" startIcon={<CloseIcon />} className={classes.cancelButton}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </form>

                </div>
            </SideMenu>
        </>
    );
}

export default CadastrarTransportadoraPage