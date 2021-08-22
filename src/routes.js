import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import ListarClientePage from './pages/conta/ListarClientePage';
import CadastrarClientePage from './pages/conta/CadastrarClientePage';
import EditarClientePage from './pages/conta/EditarClientePage';

import ListarTransportadoraPage from './pages/banco/ListarTransportadoraPage';
import CadastrarTransportadoraPage from './pages/banco/CadastrarTransportadoraPage';
import EditarTransportadoraPage from './pages/banco/EditarTransportadoraPage';

import ListarFornecedorPage from './pages/categoria/ListarFornecedorPage';
import CadastrarFornecedorPage from './pages/categoria/CadastrarFornecedorPage';
import EditarFornecedorPage from './pages/categoria/EditarFornecedorPage';

// import ListarFuncionarioPage from './pages/funcionario/ListarFuncionarioPage';
// import CadastrarFuncionarioPage from './pages/funcionario/CadastrarFuncionarioPage';
// import MostrarFuncionarioPage from './pages/funcionario/MostrarFuncionarioPage';
// import EditarFuncionarioPage from './pages/funcionario/EditarFuncionarioPage';

import LoginPage from './pages/login/LoginPage';
import CadastreSePagePage from './pages/login/CadastreSePage';
import RoutesPrivate from './RoutePrivate';

export default function Routes() {

    return (
        <BrowserRouter>

            <Switch>


                <Route path="/login" exact component={LoginPage}></Route>
                <Route path="/cadastreSe" exact component={CadastreSePagePage}></Route>

                <RoutesPrivate>
                    <RoutesPrivate path="/" exact component={Home}></RoutesPrivate>

                    <Route path="/contas" exact component={ListarClientePage}></Route>
                    <Route path="/conta/novo" exact component={CadastrarClientePage}></Route>
                    <Route path="/conta/editar/:id" exact component={EditarClientePage}></Route>

                    <Route path="/bancos" exact component={ListarTransportadoraPage}></Route>
                    <Route path="/banco/novo" exact component={CadastrarTransportadoraPage}></Route>
                    <Route path="/banco/editar/:id" exact component={EditarTransportadoraPage}></Route>

                    <Route path="/categorias" exact component={ListarFornecedorPage}></Route>
                    <Route path="/categoria/novo" exact component={CadastrarFornecedorPage}></Route>
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