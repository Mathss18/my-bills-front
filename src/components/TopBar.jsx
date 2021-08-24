import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, IconButton } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useMenu } from "../context/SideMenuContext";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import logo1 from '../assets/images/my-bills-logo.png';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: 999,
        boxShadow: 'none',
        borderBottom: '1px solid #e7e7e7'
        //backgroundColor: theme.palette.background.dark,
    },
    iconButton: {
        paddingRight: theme.spacing(2),
    },
    leaveButton: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        marginLeft: theme.spacing(2),
    }

}));


function TopBar() {
    const classes = useStyles();
    const history = useHistory();
    const [openSideMenu, setOpenSideMenu] = useMenu();

    return (
        <AppBar color="inherit" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenSideMenu(!openSideMenu)}>
                    <MenuIcon />
                </IconButton>
                <img src={logo1} width="50px"/>
                <div className={classes.grow}></div>

                <Button variant="outlined" className={classes.leaveButton} startIcon={<ExitToAppIcon />} onClick={() => {
                    localStorage.removeItem('token')
                    history.push("/")
                }}>Sair</Button>
            </Toolbar>
        </AppBar>
    );

}

export default TopBar;