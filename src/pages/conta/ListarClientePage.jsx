import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import language from '../../config/tableTranslation';
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

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


function ListarClientePage() {
    const classes = useStyles();
    const history = useHistory();
    const [eventos, setEventos] = useState([])

    function handleDateClick(event) {
        console.log(event);
    }

    function handleOnClickEditButton(event, id) {
        history.push("/cliente/editar/" + id)
    }



    useEffect(() => {

        const eventos = [
            { title: 'Pagar Vet', date: '2021-08-20', color: 'red' },
            { title: 'Comprar Roups', date: '2021-08-21' }
        ];
        setEventos(eventos)



    }, []);

    return (
        <>
            <TopBar />
            <SideMenu>
                <FullCalendar
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth, listWeek'
                    }}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={eventos}
                    dateClick={handleDateClick}
                    eventClick={handleDateClick}
                />
            </SideMenu>

        </>
    );
}

export default ListarClientePage;