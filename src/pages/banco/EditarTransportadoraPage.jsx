import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { Grid, TextField, CardMedia, Divider, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { api, parseJwt } from '../../services/api';
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
    image: {
        border: "2px solid black",
        borderRadius: '10px',
        height: "200px",
        maxWidth: "500px",
        margin: '10px'
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
    saveButton: {
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        margin: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#fff',
            color: theme.palette.primary.main,
        },
    },
    cancelButton: {
        width: '100%',
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        margin: theme.spacing(2),
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
    id_usuario: 1,
}

function EditarTransportadoraPage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const { id } = useParams();

    useEffect(() => {
        console.log(values);
        api.get('/bancos/' + id)
            .then((response) => {
                setValues(response.data);
            })

    }, []);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        console.log(values);
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

    function handleOnSubmit(event) {
        event.preventDefault();
        api.put('/bancos/' + id, values)
            .then((response) => {
                console.log(response);
                Swal.fire({
                    title: 'Atualizado com sucesso!',
                    html: 'Redirecionando...',
                    position: 'top-end',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        history.push("/bancos")
                    }
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erro ao atualizar!',
                    html: error.response.data.mensagem,
                    position: 'top-end',
                    icon: 'error',
                    timer: 10000,
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        //history.push("/transportadoras")
                    }
                })
            })
    }

    function handleDelete() {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Isso será irreversivel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Sim, excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete("/bancos/" + id)
                    .then((result) => {
                        Swal.fire(
                            'Excluido!',
                            'Banco excluido com sucesso.',
                            'success'
                        )
                        history.push("/bancos")
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Erro ao excluir!',
                            html: error.response.data.mensagem,
                            position: 'top-end',
                            icon: 'error',
                            timer: 10000,
                            timerProgressBar: true,
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                //history.push("/transportadoras")
                            }
                        })
                    })

            }

        })
    }


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
                            <Grid container xs={12} sm={4} justifyContent="center">
                                <Button variant="outlined" startIcon={<DeleteForeverIcon />} className={classes.cancelButton} onClick={handleDelete} >Excluir</Button>
                            </Grid>
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

export default EditarTransportadoraPage;