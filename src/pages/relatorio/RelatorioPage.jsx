import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { api, parseJwt, getUserId } from '../../services/api';
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


function RelatorioPage() {
    const classes = useStyles();
    const history = useHistory();
    const [bancos, setBancos] = useState([]);
    const columns = ["Nome", "Saldo Atual", 'Saldo Daqui 1 Mês', "Saldo Total Calculado"];
    const data = [];

    function handleOnClickEditButton(event, id) {
        history.push("/banco/editar/"+id)
    }

    useEffect(() => {
        api.get('/relatorio/'+getUserId())
            .then((response) => {
                response.data.forEach(element => {
                    var array = [
                        element['nome'],
                        element['saldo'],
                        element['saldo_mes'],
                        element['saldo_previsto']
                        ]
                    data.push(array);

                });
                setBancos(data)

            })
    }, []);

    return (
        <>
            <TopBar />
            <SideMenu>
                {bancos.map((banco, index) => (
                    <h4 key={index} >{banco.nome}</h4>
                ))}
                <MUIDataTable
                    title={"Relatorio dos Bancos"}
                    data={bancos}
                    columns={columns}
                    options={language}
                />
            </SideMenu>

        </>
    );
}

export default RelatorioPage;