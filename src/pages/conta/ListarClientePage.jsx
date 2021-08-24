import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import TopBar from "../../components/TopBar";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { api, parseJwt, getUserId } from '../../services/api';
import FullCalendar from '@fullcalendar/react';
import localePtBr from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list'
import basicDa from '@fullcalendar/list'
import Swal from 'sweetalert2';
import CadastrarClientePage from "./CadastrarClientePage";
import { useCalendar } from "../../context/CalendarContext";
import { useInfo } from "../../context/InfoContext";

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
    calendar: {
        display: 'flex',
        width: '100%'
    },
}));

const initialValues = {
    id: '',
    title: '',
    start: '',
    end: null,
    color: '',
    description: '',
    dataBaixa: '',
    tipo: '',
    situacao: '',
    valor: '',
    id_categoria: '',
    id_banco: '',
    id_usuario: (parseJwt(localStorage.getItem('token'))).id,
}

function ListarClientePage() {
    const history = useHistory();
    const [eventos, setEventos] = useState([])
    const [open, setOpen] = useCalendar();
    const [info, setInfo] = useInfo(initialValues)
    const classes = useStyles();


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
                zerar();

                //initialValues.start = event.dateStr;
                setInfo(info => {
                    return {
                        ...info,
                        start: event.dateStr,
                        tipo: 1,
                        situacao: 0,
                    }
                })

                setOpen(true)
            } else if (result.isDenied) {
                zerar();

                setInfo(info => {
                    return {
                        ...info,
                        start: event.dateStr,
                        tipo: 0,
                        situacao: 0,
                    }
                })

                setOpen(true)
            }
        })
    }

    function handleEventClick(event) {
        console.log(event.event.id);
        setInfo(info => {
            return {
                ...info,
                id: event.event.id,
                title: (event.event.title).split(' -')[0],
                start: event.event.startStr,
                color: event.event.backgroundColor,
                description: event.event.extendedProps.description,
                dataBaixa: event.event.extendedProps.dataBaixa,
                tipo: event.event.extendedProps.tipo,
                valor: event.event.extendedProps.valor,
                situacao: event.event.extendedProps.situacao,
                id_categoria: event.event.extendedProps.id_categoria,
                id_banco: event.event.extendedProps.id_banco
            }
        })
        setOpen(true)
    }

    function zerar() {
        initialValues.id = '';
        initialValues.title = '';
        initialValues.start = '';
        initialValues.color = '';
        initialValues.description = '';
        initialValues.dataBaixa = '';
        initialValues.tipo = '';
        initialValues.valor = '';
        initialValues.situacao = '';
        initialValues.id_categoria = '';
        initialValues.id_banco = '';
        setInfo(initialValues)
        console.log(info);
    }


    useEffect(() => {
        api.get('/contas/usuarios/'+getUserId())
            .then((response) => {
                const eventos = [];
                response.data.forEach(element => {
                    if (element['tipo'] === 1) {
                        element['title'] = element['title'] + ' - ' + 'receber'
                    }
                    else if (element['tipo'] === 0) {
                        element['title'] = element['title'] + ' - ' + 'pagar'
                    }
                    eventos.push(element)
                });
                setEventos(eventos)
                console.log(eventos);
            })
    }, [open]);

    function getInitialView() {
        if (window.screen.width < 500){
            return 'dayGridDay'
        } else {
            return 'dayGridMonth'
        }
    }

    return (
        <>
            <TopBar />
            <SideMenu>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView= {getInitialView()}
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth dayGridDay'
                      }}
                    events={eventos}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    locale={localePtBr}
                    height={'auto'}
                />
                <CadastrarClientePage isOpen={open} info={info} />
            </SideMenu>

        </>
    );
}

export default ListarClientePage;