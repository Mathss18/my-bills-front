import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useEffect, useState } from 'react';
import { api, getUserId } from '../services/api';


const useStyles = makeStyles((theme) => ({

    card: {
        minWidth: 275,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',
        // Transicao 
        transition: theme.transitions.create(['transform', 'color'], {
            duration: theme.transitions.duration.short,
        }),
    },
    card_header: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative'
    },
    card_title: {
        color: '#fff',
    },
    card_icon: {
        // Transicao 
        transition: theme.transitions.create(['transform', 'color'], {
            duration: theme.transitions.duration.short,
        }),
        position: 'absolute',
        top: '-150%',
        right: '0%',
        fontSize: 150,
        color: '#fff',
        opacity: '0.5'
    },

    card_green: {
        backgroundImage: 'linear-gradient(315deg, #0df2a2 0%, #0ac382 74%)',
        "&:hover": {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(250deg, #0df2a2 0%, #0ac382 74%)',
        },
        "&:hover $card_icon": {
            transform: 'scale(1.15)',
            color: '#009933'
        },
    },
    card_red: {
        backgroundImage: 'linear-gradient(315deg, #e35d5b 0%, #e53935 74%)',
        "&:hover": {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(250deg, #e35d5b 0%, #e53935 74%)',
        },
        "&:hover $card_icon": {
            transform: 'scale(1.15)',
            color: '#b31217'
        },
    },
    card_blue: {
        backgroundImage: 'linear-gradient(315deg, #00B4DB 0%, #0083B0 74%)',
        "&:hover": {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(250deg, #00B4DB 0%, #0083B0 74%)',
        },
        "&:hover $card_icon": {
            transform: 'scale(1.15)',
            color: '#3a6073'
        },
    },

    card_green_footer: {
        justifyContent: 'center',
        backgroundColor: '#009933',
    },
    card_red_footer: {
        justifyContent: 'center',
        backgroundColor: '#b31217',
    },
    card_blue_footer: {
        justifyContent: 'center',
        backgroundColor: '#3a6073',
    },

    card_blue_header: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-evenly',
    }, 
    card_blue_content_conteiner: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-evenly'
    },

}));


function DashboardCard(props) {
    const classes = useStyles();
    const type = props.type;
    const [receber, setReceber] = useState(0);
    const [pagar, setPagar] = useState(0);
    const [dados_mes, setDadosMes] = useState({receber: 0, pagar: 0});
    console.log(type);
    useEffect(() => {
        api.get('/contas/home/'+getUserId())
            .then((response) => {
                setReceber(response.data.conta_receber);
                setPagar(response.data.conta_pagar);
                setDadosMes(response.data.dados_mes);
            })
    }, []);
    if (type === 'green') {
        return (
            <Card className={classes.card + " " + classes.card_green}>

                <CardContent>
                    {/*---- Card Header* ----*/}
                    <div className={classes.card_header}>
                        <Typography className={classes.card_title} color="textSecondary" gutterBottom>
                            Contas a Receber Hoje
                        </Typography>
                        <TrendingUpIcon className={classes.card_icon} />
                    </div>
                    {/*---- Card Content* ----*/}
                    <Typography className={classes.card_title} variant="h5" component="h2">
                        <b>{receber.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>
                    </Typography>
                </CardContent>

                {/*---- Card Footer* ----*/}
                <CardActions className={classes.card_green_footer}>
                    <a size="small" className={classes.card_title} href="contas">Ir para calendario de contas</a>
                </CardActions>

            </Card>
        );
    }
    else if (type === 'red') {
        return (
            <Card className={classes.card + " " + classes.card_red}>

                <CardContent>
                    {/*---- Card Header* ----*/}
                    <div className={classes.card_header}>
                        <Typography className={classes.card_title} color="textSecondary" gutterBottom>
                            Contas a Pagar Hoje
                        </Typography>
                        <TrendingDownIcon className={classes.card_icon} />
                    </div>
                    {/*---- Card Content* ----*/}
                    <Typography className={classes.card_title} variant="h5" component="h2">
                        <b>{pagar.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>
                    </Typography>
                </CardContent>

                {/*---- Card Footer* ----*/}
                <CardActions className={classes.card_red_footer}>
                    <a size="small" className={classes.card_title} href="contas">Ir para calendario de contas</a>
                </CardActions>

            </Card>
        );
    }
    else if (type === 'blue') {
        return (
            <Card className={classes.card + " " + classes.card_blue}>

                <CardContent>
                    {/*---- Card Header* ----*/}
                    <div className={classes.card_blue_header}>
                        <Typography className={classes.card_title} color="textSecondary" gutterBottom>
                            Recebimentos do Mês
                        </Typography>
                        <Typography className={classes.card_title} color="textSecondary" gutterBottom>
                            Pagamentos do Mês
                        </Typography>
                        <BarChartIcon className={classes.card_icon} />
                    </div>
                    {/*---- Card Content* ----*/}
                    <div className={classes.card_blue_content_conteiner}>
                        <Typography className={classes.card_title} variant="h5" component="h2">
                            <b>{(dados_mes.receber).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>
                        </Typography>
                        <Typography className={classes.card_title} variant="h5" component="h2">
                            <b>{(dados_mes.pagar).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</b>
                        </Typography>
                    </div>
                </CardContent>

                {/*---- Card Footer* ----*/}
                <CardActions className={classes.card_blue_footer}>
                    <a size="small" className={classes.card_title} href="contas">Ir para calendario de contas</a>
                </CardActions>

            </Card>
        );
    }
    else {
        return <h1>Define prop.type = red/green/blue</h1>;
    }


}

export default DashboardCard;