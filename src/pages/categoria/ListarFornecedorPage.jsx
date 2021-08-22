import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { api } from '../../services/api';
import language from '../../config/tableTranslation';
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    optionsButtons: {
        border: '1px solid #3f51b5',
        borderRadius: '6px',
        boxShadow: "2px 2px #757575",
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        marginRight: theme.spacing(1),
        padding: 2,
        fontSize: '28px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    saveButton: {
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#fff',
            color: theme.palette.primary.main,
        },
    },
}));


function ListarFornecedorPage() {
    const classes = useStyles();
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const columns = ["Nome", "Cor", "Ações"];
    const data = [];

    function handleOnClickEditButton(event, id) {
        history.push("/categoria/editar/"+id)
    }



    useEffect(() => {
        api.get('/categorias')
            .then((response) => {
                response.data.forEach(element => {
                    var array = [
                        element['descricao'],
                        element['cor'],
                        <>
                            <EditIcon className={classes.optionsButtons} onClick={(event) => handleOnClickEditButton(event, element['id'])} />
                        </>
                        ]
                    data.push(array);

                });
                setCategorias(data)

            })
    }, []);

    return (
        <>
            <TopBar />
            <SideMenu>
                <Button onClick={() => history.push("/categoria/novo")} variant="outlined" startIcon={<AddIcon />} className={classes.saveButton}>Adicionar</Button>
                <MUIDataTable
                    title={"Lista de Categorias"}
                    data={categorias}
                    columns={columns}
                    options={language}
                />
            </SideMenu>

        </>
    );
}

export default ListarFornecedorPage;