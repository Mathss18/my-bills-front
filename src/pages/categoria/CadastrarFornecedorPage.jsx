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
import Swal from 'sweetalert2';



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
    descricao: '',
    cor: '#000000',
    id_usuario: (parseJwt(localStorage.getItem('token'))).id,
}


function CadastrarFornecedorPage() {
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
        api.post('/categorias', values)
            .then(response => {
                console.log(response);
                Swal.fire({
                    title: 'Cadastrado com sucesso!',
                    html: 'Redirecionando...',
                    position: 'center',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        history.push("/categorias")
                    }
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erro ao cadastrar!',
                    html: error.response.data.mensagem,
                    position: 'center',
                    icon: 'error',
                    timer: 10000,
                    timerProgressBar: true,
                })
            });
    }

    return (
        <>
            <TopBar />

            <SideMenu>
                <div>
                    <Divider />
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                        <AssignmentIcon />
                        <h3>Dados da Categoria</h3>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="Nome da categoria" className={classes.input} value={values.descricao} name="descricao" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField type="color" variant="outlined" fullWidth label="Cor da categoria" className={classes.input} value={values.cor} name="cor" onChange={handleOnChange} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item>
                                <Button type="submit" variant="outlined" startIcon={<CheckIcon />} className={classes.saveButton}>Salvar</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push("/categorias")} variant="outlined" startIcon={<CloseIcon />} className={classes.cancelButton}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </form>

                </div>
            </SideMenu>
        </>
    );
}

export default CadastrarFornecedorPage