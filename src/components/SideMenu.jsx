import { makeStyles } from "@material-ui/core/styles";
import {
    Drawer,
    IconButton,
    List,
    Grid,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListSubheader,
    Link,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { useCadastroMenu } from "../context/SideMenuCadastroContext";
import { useMenu } from "../context/SideMenuContext";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from '@material-ui/icons/Assignment';
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WorkIcon from '@material-ui/icons/Work';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import logo1 from '../assets/images/my-bills-logo.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        //backgroundColor: theme.palette.background.lightDark,
        //color: '#fff'
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "center",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function SideMenu({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const [openCadastroList, setOpenCadastroList] = useCadastroMenu();
    const [openSideMenu, setOpenSideMenu] = useMenu();

    // Função que controla se Side Menu esta aberto ou fechado
    const handleDrawerClose = () => {
        if (window.screen.width < 500){
            setOpenSideMenu(!openSideMenu)
        }
    };

    // Função que controla se Lista de cadastros esta aberto ou fechado
    const handleOpenCadastroList = () => {
        setOpenCadastroList(!openCadastroList);
    };

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openSideMenu}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Grid container className={classes.drawerHeader}>
                    <Link to='/'><img src={logo1} width="50px"/></Link>
                    <Grid container justifyContent="flex-end" xs={6}><IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton></Grid>
                </Grid> 
                <Divider />
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >

                    <ListItem button onClick={() => {history.push("/"); handleDrawerClose();}}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button onClick={handleOpenCadastroList}>
                        <ListItemIcon>
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cadastros" />
                        {openCadastroList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openCadastroList} timeout="auto" unmountOnExit>

                        <List onClick={() => {history.push("/contas"); handleDrawerClose();}} disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <DateRangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Calendario" />
                            </ListItem>
                        </List>

                        <List onClick={() => {history.push("/bancos"); handleDrawerClose();}} disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Bancos" />
                            </ListItem>
                        </List>

                        <List onClick={() => {history.push("/categorias"); handleDrawerClose();}} disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary="Categorias" />
                            </ListItem>
                        </List>

                    </Collapse>

                    <ListItem button onClick={() => {history.push("/relatorio"); handleDrawerClose();}}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Relatório" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: openSideMenu })}>
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
}

export default SideMenu;
