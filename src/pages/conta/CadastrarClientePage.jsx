import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { api, parseJwt } from '../../services/api';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useCalendar } from "../../context/CalendarContext";
import { useInfo } from "../../context/InfoContext";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formDiv: {
        margin: theme.spacing(2),
    }
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
    title: '',
    start: '',
    end: null,
    color: '',
    description: '',
    dataBaixa: '',
    tipo: '',
    situacao: '',
    id_categoria: '',
    id_banco: '',
    id_usuario: (parseJwt(localStorage.getItem('token'))).id,
}

export default function CadastrarClientePage() {
    const classes = useStyles();
    const [open, setOpen] = useCalendar();
    const [info, setInfo] = useInfo()
    const [categorias, setCategorias] = useState([]);
    const [bancos, setBancos] = useState([]);

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        api.get('/categorias')
            .then((response) => {
                setCategorias(response.data);
            })
        api.get('/bancos')
            .then((response) => {
                setBancos(response.data);
            })

    }, []);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setInfo({ ...info, [name]: value });
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        console.log(info);
        api.post('/contas', info)
            .then((response) => {
                console.log(response);
            })

    }

    function handleColorChange(event) {
        handleOnChange(event);
        const id = event.target.value

        api.get('/categorias/' + id)
            .then((response) => {
                setInfo(info => {
                    return {
                        ...info,
                        color: response.data.cor
                    }
                })
            })

    }

    return (
        <div>
            <Dialog fullScreen open={open} TransitionComponent={Transition}>
                <form onSubmit={handleOnSubmit}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Cadastrar nova conta
                            </Typography>
                            <Button color="inherit" type="submit">
                                Salvar
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.formDiv}>

                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="Título" className={classes.input} value={info.title} name="title" onChange={handleOnChange} readonly />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" type="date" fullWidth label="Data" className={classes.input} value={info.start} name="start" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="Descrição" className={classes.input} value={info.description} name="description" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="situacao">
                                    <InputLabel>Situação</InputLabel>
                                    <Select label="Situação" name="situacao" value={info.situacao} onChange={handleOnChange}>
                                        <MenuItem value={0}>Pendente</MenuItem>
                                        <MenuItem value={1}>Finalizado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="categoria">
                                    <InputLabel>Categorias</InputLabel>
                                    <Select label="Categorias" name="id_categoria" value={info.id_categoria} onChange={handleColorChange}>
                                        {categorias.map((categoria) => {
                                            return (
                                                <MenuItem key={categoria.id} value={categoria.id}>{categoria.descricao}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" type="color" fullWidth label="Cor da categoria" className={classes.input} value={info.color} name="color" onChange={handleOnChange} disabled />
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="banco">
                                    <InputLabel>Banco</InputLabel>
                                    <Select label="Banco" name="id_banco" value={info.id_banco} onChange={handleOnChange}>
                                        {bancos.map((banco) => {
                                            return (
                                                <MenuItem key={banco.id} value={banco.id}>{banco.nome}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>


                    </div>
                </form>
            </Dialog>
        </div>
    );
}