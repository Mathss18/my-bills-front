import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import ListarClientePage from './pages/conta/ListarClientePage';
import CadastrarClientePage from './pages/conta/CadastrarClientePage';
import EditarClientePage from './pages/conta/EditarClientePage';
import MostrarClientePage from './pages/conta/MostrarClientePage';

import ListarTransportadoraPage from './pages/banco/ListarTransportadoraPage';
import CadastrarTransportadoraPage from './pages/banco/CadastrarTransportadoraPage';
import EditarTransportadoraPage from './pages/banco/EditarTransportadoraPage';

import ListarFornecedorPage from './pages/categoria/ListarFornecedorPage';
import CadastrarFornecedorPage from './pages/categoria/CadastrarFornecedorPage';
import MostrarFornecedorPage from './pages/categoria/MostrarFornecedorPage';
import EditarFornecedorPage from './pages/categoria/EditarFornecedorPage';

// import ListarFuncionarioPage from './pages/funcionario/ListarFuncionarioPage';
// import CadastrarFuncionarioPage from './pages/funcionario/CadastrarFuncionarioPage';
// import MostrarFuncionarioPage from './pages/funcionario/MostrarFuncionarioPage';
// import EditarFuncionarioPage from './pages/funcionario/EditarFuncionarioPage';

import LoginPage from './pages/login/LoginPage';
import RoutesPrivate from './RoutePrivate';

export default function Routes() {

    return (
        <BrowserRouter>

            <Switch>


                <Route path="/login" exact component={LoginPage}></Route>

                <RoutesPrivate>
                    <RoutesPrivate path="/" exact component={Home}></RoutesPrivate>

                    <Route path="/contas" exact component={ListarClientePage}></Route>
                    <Route path="/conta/novo" exact component={CadastrarClientePage}></Route>
                    <Route path="/conta/mostrar/:id" exact component={MostrarClientePage}></Route>
                    <Route path="/conta/editar/:id" exact component={EditarClientePage}></Route>

                    <Route path="/bancos" exact component={ListarTransportadoraPage}></Route>
                    <Route path="/banco/novo" exact component={CadastrarTransportadoraPage}></Route>
                    <Route path="/banco/editar/:id" exact component={EditarTransportadoraPage}></Route>

                    <Route path="/categorias" exact component={ListarFornecedorPage}></Route>
                    <Route path="/categoria/novo" exact component={CadastrarFornecedorPage}></Route>
                    <Route path="/categoria/mostrar/:id" exact component={MostrarFornecedorPage}></Route>
                    <Route path="/categoria/editar/:id" exact component={EditarFornecedorPage}></Route>

                    {/* <Route path="/funcionarios" exact component={ListarFuncionarioPage}></Route>
                    <Route path="/funcionario/novo" exact component={CadastrarFuncionarioPage}></Route>
                    <Route path="/funcionario/mostrar/:id" exact component={MostrarFuncionarioPage}></Route>
                    <Route path="/funcionario/editar/:id" exact component={EditarFuncionarioPage}></Route> */}
                </RoutesPrivate>




                <Route path="*" component={() => <h1>Page not found</h1>} />

            </Switch>

        </BrowserRouter>
    )
}