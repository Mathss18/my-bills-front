import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
}));

const initialValues = {
    descricao: '',
    cor: '',
    id_usuario: (parseJwt(localStorage.getItem('token'))).id,
}

function EditarFornecedorPage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const { id } = useParams();

    useEffect(() => {
        api.get('/categorias/' + id)
            .then((response) => {
                setValues(response.data);
            })

    }, []);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        api.put('/categorias/' + id, values)
            .then((response) => {
                console.log(response);
                Swal.fire({
                    title: 'Atualizado com sucesso!',
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
                console.log(error.response.request.responseText);
                Swal.fire({
                    title: 'Erro ao atualizar!',
                    html: error.response.data.message,
                    position: 'center',
                    icon: 'error',
                    timer: 10000,
                    timerProgressBar: true,
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
                api.delete("/categorias/" + id)
                    .then((result) => {
                        Swal.fire(
                            'Excluido!',
                            'Categoria excluida com sucesso.',
                            'success'
                        )
                        history.push("/categorias")
                    })
                    .catch((error) => {
                        console.log(error.response.request.responseText);
                        Swal.fire({
                            title: 'Erro ao excluir!',
                            html: error.response.data.message,
                            position: 'center',
                            icon: 'error',
                            timer: 10000,
                            timerProgressBar: true,
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
                        <h3>Dados Pessoais</h3>
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
                                <Button variant="outlined" startIcon={<DeleteForeverIcon />} className={classes.cancelButton} onClick={handleDelete} >Excluir</Button>
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

export default EditarFornecedorPage;