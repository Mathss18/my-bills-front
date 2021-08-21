import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import api from '../../services/api';

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
    tipoCliente: '',
    situacao: '',
    tipoContribuinte: '',
    inscricaoEstadual: '',
    nome: '',
    cpfCnpj: '',
    email: '',
    contato: '',
    rua: '',
    cidade: '',
    numero: '',
    cep: '',
    bairro: '',
    estado: '',
    telefone: '',
    celular: '',
    codigoMunicipio: '',


}

function MostrarClientePage() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const { id } = useParams();

    useEffect(() => {
        api.get('/cliente/' + id)
            .then((response) => {
                setValues(response.data['data']);
            })

    }, []);

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
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="tipoCliente">
                                    <InputLabel>Tipo de Cliente</InputLabel>
                                    <Select label="Tipo de Cliente" name="tipoCliente" value={values.tipoCliente} disabled>
                                        <MenuItem value={"pf"}>Pessia Física</MenuItem>
                                        <MenuItem value={"pj"}>Pessia Juridica</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="situacao">
                                    <InputLabel>Situação</InputLabel>
                                    <Select label="Situação" value='' name="situacao" value={values.situacao} disabled>
                                        <MenuItem value={1}>Ativo</MenuItem>
                                        <MenuItem value={0}>Inativo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} name="tipoContribuinte">
                                    <InputLabel>Tipo de contribuinte</InputLabel>
                                    <Select label="Tipo de contribuinte" name="tipoContribuinte" value={values.tipoContribuinte} disabled>
                                        <MenuItem value={1}>Contribuinte ICMS</MenuItem>
                                        <MenuItem value={2}>Contribuinte ISENTO</MenuItem>
                                        <MenuItem value={9}>Não Contribuinte</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" fullWidth label="Inscrição Estadual" helperText="Digite ISENTO caso não haja Inscrição Estadual" className={classes.input} value={values.inscricaoEstadual} name="inscricaoEstadual" disabled/>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Nome/Razão social" fullWidth className={classes.input} value={values.nome} name="nome" disabled />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="CPF/CNPJ" fullWidth className={classes.input} value={values.cpfCnpj} name="cpfCnpj" disabled />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Email" fullWidth className={classes.input} value={values.email} name="email" disabled />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Contato" fullWidth className={classes.input} value={values.contato} name="contato" disabled />
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
                                <TextField variant="outlined" label="CEP" fullWidth className={classes.input} value={values.cep} name="cep" disabled />

                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Rua" fullWidth className={classes.input} value={values.rua} name="rua" disabled />

                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Número" fullWidth className={classes.input} value={values.numero} name="numero" disabled />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Cidade" fullWidth className={classes.input} value={values.cidade} name="cidade" disabled />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Bairro" fullWidth className={classes.input} value={values.bairro} name="bairro" disabled />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" fullWidth required className={classes.input} >
                                    <InputLabel>Estado</InputLabel>
                                    <Select label="Estado" name="estado" value={values.estado} disabled >
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
                                <TextField variant="outlined" label="Telefone" fullWidth className={classes.input} value={values.telefone} name="telefone" disabled />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Celular" fullWidth className={classes.input} value={values.celular} name="celular" disabled />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField variant="outlined" label="Código do Municipio" fullWidth className={classes.input} value={values.codigoMunicipio} name="codigoMunicipio" disabled />
                            </Grid>

                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item>
                                <Button onClick={() => history.push("/clientes")} variant="outlined" startIcon={<PrintIcon />} className={classes.saveButton}>Imprimir</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push("/clientes")} variant="outlined" startIcon={<CloseIcon />} className={classes.cancelButton}>Cancelar</Button>
                            </Grid>
                        </Grid>
                </div>
            </SideMenu>
        </>
    );
}

export default MostrarClientePage;