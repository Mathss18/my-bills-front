import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Button, CardMedia } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { api, parseJwt } from '../../services/api';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MouseIcon from '@material-ui/icons/Mouse';
import PrintIcon from '@material-ui/icons/Print';

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
    usuario: '',

    usuarioAccess: '',
}

function MostrarFuncionarioPage() {
    const classes = useStyles();
    const history = useHistory();
    const [grupos, setGrupos] = useState([]);
    const [values, setValues] = useState(initialValues);
    const { id } = useParams();

    useEffect(() => {
        api.get('/grupos')
            .then((response) => {
                setGrupos(response.data['data']);
            });
        api.get('/funcionario/' + id)
            .then((response) => {
                console.log(response.data['data']);

                // Verifica se o funcionario tem um usuario (verifica se tem email no sistema)
                if (response.data['data'].usuario === null) {
                    response.data['data'].usuario = { email: '', senha: '' };
                }

                setValues(response.data['data']);
                setValues(values => {
                    return {
                        ...values,
                        emailPessoal: response.data['data']['email'],
                        usuarioAccess: response.data['data'].usuario['situacao'],
                        email: response.data['data'].usuario['email'],
                        senha: response.data['data'].usuario['senha'],
                    }
                })

                if (response.data['data'].usuario['situacao'] === 0) {
                    document.getElementById('email').disabled = true;
                    document.getElementById('senha').disabled = true;
                    document.getElementById('email').style.backgroundColor = "#ccc";
                    document.getElementById('senha').style.backgroundColor = "#ccc";
                }

            })


    }, []);

    const renderRemoveAccessButton = () => {
        if (values.usuario.situacao === 1) {
            return <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }} ><CheckIcon /><h4>Funcionario com acesso</h4></div>
        }
        else {
            return <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }} ><CloseIcon /><h4>Funcionario sem acesso</h4></div>
        }
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
                    <form>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="grupo" disabled>
                                    <InputLabel>Grupo</InputLabel>
                                    <Select label="Grupo" name="grupo_id" value={values.grupo_id}>
                                        {grupos.map((grupo) => {
                                            return (
                                                <MenuItem key={grupo.id} value={grupo.id}>{grupo.nome}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="situacao" disabled>
                                    <InputLabel>Situação</InputLabel>
                                    <Select label="Situação" value='' name="situacao" value={values.situacao}>
                                        <MenuItem value={1}>Ativo</MenuItem>
                                        <MenuItem value={0}>Inativo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="sexo" disabled>
                                    <InputLabel>Sexo</InputLabel>
                                    <Select label="Sexo" name="sexo" value={values.sexo}>
                                        <MenuItem value={"masculino"}>Masculino</MenuItem>
                                        <MenuItem value={"feminino"}>Feminino</MenuItem>
                                        <MenuItem value={"outro"}>Outro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="RG" className={classes.input} value={values.rg} name="rg" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Nome Completo" fullWidth className={classes.input} value={values.nome} name="nome" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="CPF" fullWidth className={classes.input} value={values.cpf} name="cpf" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" type="date" label="Data de Nascimento" fullWidth className={classes.input} value={values.dataNascimento} name="dataNascimento" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField inputProps={{ step: "0.01" }} type="number" step="0.01" variant="outlined" label="Comissão (%)" fullWidth className={classes.input} value={values.comissao} name="comissao" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Email Pessoal" fullWidth className={classes.input} value={values.emailPessoal} name="emailPessoal" disabled/>
                            </Grid>

                        </Grid>
                        <br />
                        <Divider />
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', }}>
                            <LocationOnIcon />
                            <h3>Endereço</h3>
                        </div>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="CEP" fullWidth className={classes.input} value={values.cep} name="cep" disabled/>

                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Rua" fullWidth className={classes.input} value={values.rua} name="rua" disabled/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Número" fullWidth className={classes.input} value={values.numero} name="numero" disabled/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Cidade" fullWidth className={classes.input} value={values.cidade} name="cidade" disabled/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Bairro" fullWidth className={classes.input} value={values.bairro} name="bairro" disabled/>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} disabled>
                                    <InputLabel>Estado</InputLabel>
                                    <Select label="Estado" name="estado" value={values.estado} >
                                        <MenuItem value={"AC"}>Acre</MenuItem>
                                        <MenuItem value={"AL"}>Alagoas</MenuItem>
                                        <MenuItem value={"AP"}>Amapá</MenuItem>
                                        <MenuItem value={"AM"}>Amazonas</MenuItem>
                                        <MenuItem value={"BA"}>Bahia</MenuItem>
                                        <MenuItem value={"CE"}>Ceará</MenuItem>
                                        <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                                        <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                                        <MenuItem value={"GO"}>Goiás</MenuItem>
                                        <MenuItem value={"MA"}>Maranhão</MenuItem>
                                        <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                                        <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                                        <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                                        <MenuItem value={"PA"}>Pará</MenuItem>
                                        <MenuItem value={"PB"}>Paraíba</MenuItem>
                                        <MenuItem value={"PR"}>Paraná</MenuItem>
                                        <MenuItem value={"PE"}>Pernambuco</MenuItem>
                                        <MenuItem value={"PI"}>Piauí</MenuItem>
                                        <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                                        <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                                        <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                                        <MenuItem value={"RO"}>Rondônia</MenuItem>
                                        <MenuItem value={"RR"}>Roraima</MenuItem>
                                        <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                                        <MenuItem value={"SP"}>São Paulo</MenuItem>
                                        <MenuItem value={"SE"}>Sergipe</MenuItem>
                                        <MenuItem value={"TO"}>Tocantins</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Telefone" fullWidth className={classes.input} value={values.telefone} name="telefone" disabled/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Celular" fullWidth className={classes.input} value={values.celular} name="celular" disabled/>
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
                                <TextField id="email" variant="outlined" label="Email" fullWidth className={classes.input} value={values.email} name="email" disabled/>

                            </Grid>
                            <Grid item xs={3}>
                                <TextField id="senha" variant="outlined" label="Senha" fullWidth className={classes.input} value={values.senha} name="senha" disabled/>
                            </Grid>
                            <Grid item xs={6}>
                                {renderRemoveAccessButton()}
                            </Grid>
                            <Grid item xs={12}>
                                <p>* Essas serão as informações para o funcionario acessar o sistema</p>
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
                                <CardMedia className={classes.image} component="img" alt="Imagem Funcionario" image={values.foto} title="Imagem Funcionario" disabled/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item>
                                <Button onClick={() => history.push("/funcionarios")} variant="outlined" startIcon={<PrintIcon />} className={classes.saveButton}>Imprimir</Button>
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

export default MostrarFuncionarioPage;