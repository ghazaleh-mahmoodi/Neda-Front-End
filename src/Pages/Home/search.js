import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
    },
});
class Search_com extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_bar: "",
            done: false,
            result: "b"
        }
    }


    handleChanger = (e) => {
        this.setState({ search_bar: e.target.value });
        // console.log(this.state.search_bar)
    }
    handleseach = async (e) => {
        let x = await fetch('http://nedabackend.pythonanywhere.com/doctors/?search=' + this.state.search_bar, {
            mode: "cors",
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        x=await x.json()
        await this.setState({
            result:x
        })
        if(typeof(this.state.result)=="object"){
            this.setState({
                done:true
            })
        }
    };
    render() {
        const { search_bar, done } = this.state
        if (done) return <Redirect to={{ pathname: '/Searched', data: { search_barr: this.state.result } }} />
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper} style={{ backgroundColor: "rgba(255,255,255,0.5 )" }}>
                            <div>
                                <TextField onChange={this.handleChanger} value={search_bar} name="search_bar" variant="outlined" id="standard-search" fullWidth label="Search field" type="search" margin="normal" />
                                <Button onClick={this.handleseach} variant="outlined" color="rgba(33,66,99,1)" >
                                    Search
                </Button>
                            </div>
                        </Paper>
                    </Grid></Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Search_com);