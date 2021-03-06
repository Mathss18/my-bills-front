import { useState, useEffect } from 'react';
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
import MouseIcon from '@material-ui/icons/Mouse';



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
    situacao: '',
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: '',
    grupo: '',
    grupo_id: '',
    email: '',
    senha: '',
    comissao: '',
    foto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    rua: '',
    cidade: '',
    numero: '',
    cep: '',
    bairro: '',
    estado: '',
    telefone: '',
    celular: '',
    emailPessoal: '',
}



function CadastrarFuncionarioPage() {


    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        api.get('/grupos')
            .then((response) => {
                setGrupos(response.data['data']);
            })

    }, []);

    function handleOnChange(event) {
        const { name, value } = event.target;
        // const name = event.target.name;
        // const value = event.target.value;
        setValues({ ...values, [name]: value });
        console.log(values);
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        console.log(values);
        api.post('/funcionario', values)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.request.responseText);
        })
            
    }

    function handleCapture(event) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = (e) => {
            if (fileReader.readyState === 2) {
                setValues({ ...values, ['foto']: e.target.result });
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
                        <h3>Dados Pessoais</h3>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <Grid container spacing={2}>

                        <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="grupo">
                                    <InputLabel>Grupo</InputLabel>
                                    <Select label="Grupo" name="grupo_id" value={values.grupo_id} onChange={handleOnChange}>
                                        {grupos.map((grupo) => {
                                            return (
                                                <MenuItem key={grupo.id} value={grupo.id}>{grupo.nome}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="situacao">
                                    <InputLabel>Situa????o</InputLabel>
                                    <Select label="Situa????o" value='' name="situacao" value={values.situacao} onChange={handleOnChange}>
                                        <MenuItem value={1}>Ativo</MenuItem>
                                        <MenuItem value={0}>Inativo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="sexo">
                                    <InputLabel>Sexo</InputLabel>
                                    <Select label="Sexo" name="sexo" value={values.sexo} onChange={handleOnChange}>
                                        <MenuItem value={"masculino"}>Masculino</MenuItem>
                                        <MenuItem value={"feminino"}>Feminino</MenuItem>
                                        <MenuItem value={"outro"}>Outro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="RG" className={classes.input} value={values.rg} name="rg" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Nome Completo" fullWidth className={classes.input} value={values.nome} name="nome" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="CPF" fullWidth className={classes.input} value={values.cpf} name="cpf" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined"
                                    onFocus={
                                        (e) => {
                                            e.currentTarget.type = "date";
                                            e.currentTarget.focus();
                                        }
                                    }
                                    label="Data de Nascimento" fullWidth className={classes.input} value={values.dataNascimento} name="dataNascimento" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField inputProps={{ step: "0.01" }} type="number" step="0.01" variant="outlined" label="Comiss??o (%)" fullWidth className={classes.input} value={values.comissao} name="comissao" onChange={handleOnChange} />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Email Pessoal" fullWidth className={classes.input} value={values.emailPessoal} name="emailPessoal" onChange={handleOnChange} />
                            </Grid>

                        </Grid>
                        <br />
                        <Divider />
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                            <LocationOnIcon />
                            <h3>Endere??o</h3>
                        </div>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="CEP" fullWidth className={classes.input} value={values.cep} name="cep" onChange={handleOnChange} />

                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Rua" fullWidth className={classes.input} value={values.rua} name="rua" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="N??mero" fullWidth className={classes.input} value={values.numero} name="numero" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Cidade" fullWidth className={classes.input} value={values.cidade} name="cidade" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Bairro" fullWidth className={classes.input} value={values.bairro} name="bairro" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} >
                                    <InputLabel>Estado</InputLabel>
                                    <Select label="Estado" name="estado" value={values.estado} onChange={handleOnChange} >
                                        <MenuItem value={"AC"}>Acre</MenuItem>
                                        <MenuItem value={"AL"}>Alagoas</MenuItem>
                                        <MenuItem value={"AP"}>Amap??</MenuItem>
                                        <MenuItem value={"AM"}>Amazonas</MenuItem>
                                        <MenuItem value={"BA"}>Bahia</MenuItem>
                                        <MenuItem value={"CE"}>Cear??</MenuItem>
                                        <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                                        <MenuItem value={"ES"}>Esp??rito Santo</MenuItem>
                                        <MenuItem value={"GO"}>Goi??s</MenuItem>
                                        <MenuItem value={"MA"}>Maranh??o</MenuItem>
                                        <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                                        <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                                        <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                                        <MenuItem value={"PA"}>Par??</MenuItem>
                                        <MenuItem value={"PB"}>Para??ba</MenuItem>
                                        <MenuItem value={"PR"}>Paran??</MenuItem>
                                        <MenuItem value={"PE"}>Pernambuco</MenuItem>
                                        <MenuItem value={"PI"}>Piau??</MenuItem>
                                        <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                                        <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                                        <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                                        <MenuItem value={"RO"}>Rond??nia</MenuItem>
                                        <MenuItem value={"RR"}>Roraima</MenuItem>
                                        <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                                        <MenuItem value={"SP"}>S??o Paulo</MenuItem>
                                        <MenuItem value={"SE"}>Sergipe</MenuItem>
                                        <MenuItem value={"TO"}>Tocantins</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Telefone" fullWidth className={classes.input} value={values.telefone} name="telefone" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Celular" fullWidth className={classes.input} value={values.celular} name="celular" onChange={handleOnChange} />
                            </Grid>
                        </Grid>
                        <br />
                        <Divider />
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                            <MouseIcon />
                            <h3>Criar Usuario</h3>
                        </div>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Email" fullWidth className={classes.input} value={values.email} name="email" onChange={handleOnChange} />

                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Senha" fullWidth className={classes.input} value={values.senha} name="senha" onChange={handleOnChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <p>* Essas ser??o as informa????es para o funcionario acessar o sistema</p>
                            </Grid>
                        </Grid>


                        <br />
                        <Divider />
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                            <PhotoCamera />
                            <h3>Imagem</h3>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item>
                                <CardMedia className={classes.image} component="img" alt="Imagem Funcionario" image={values.foto} title="Imagem Funcionario" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>

                            <Grid item>
                                <Button variant="contained" component="label" startIcon={<PhotoCamera />} className={classes.saveButton}>Carregar Imagem
                                    <input
                                        name="foto"
                                        hidden
                                        accept="image/*"
                                        className={classes.input}
                                        type="file"
                                        onChange={handleCapture}
                                    />
                                </Button>

                            </Grid>
                        </Grid>


                        <Grid container spacing={0}>
                            <Grid item>
                                <Button type="submit" variant="outlined" startIcon={<CheckIcon />} className={classes.saveButton}>Salvar</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push("/funcionarios")} variant="outlined" startIcon={<CloseIcon />} className={classes.cancelButton}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </form>

                </div>
            </SideMenu>
        </>
    );
}

export default CadastrarFuncionarioPage