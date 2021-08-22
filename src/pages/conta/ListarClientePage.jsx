import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { api } from '../../services/api';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Qual o tipo da transação?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: `Sair`,
            confirmButtonText: `Conta a Receber`,
            denyButtonText: `Conta a Pagar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
            } else if (result.isDenied) {
                
            }
          })
    }

    function handleEventClick(event) {
        console.log(event.event._def);
    }

    function handleOnClickEditButton(event, id) {
        history.push("/cliente/editar/" + id)
    }



    useEffect(() => {
        api.get('/contas')
            .then((response) => {
                const eventos = [];
                response.data.forEach(element => {
                    eventos.push(element)
                });
                setEventos(eventos)
                console.log(eventos);
            })
    }, []);

    return (
        <>
            <TopBar />
            <SideMenu>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={eventos}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />
            </SideMenu>

        </>
    );
}

export default ListarClientePage;