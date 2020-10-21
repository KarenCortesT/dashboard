import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';

const useStyles = theme => ({
  root: {
  flexGrow: 1,
},


caption: {
   color: "#B3B3B3",
   paddingTop:6,
   fontSize: "10px",
   [theme.breakpoints.only('xs')]:{
     fontSize:'8px'
   }
 },
 toolbar: {

     fontSize: "10px",
     color: "#1A1A1A",
     fontWeight: 600
   }


});


//Divide el número de datos en páginas
class Pagination extends React.Component {

  render(){

      const { classes } = this.props;

    return (



     <div style={{ position:'absolute', top:220, right:0,height:'20%', }}>
     <TablePagination
     rowsPerPageOptions={[8]}
     component="div"
     count={this.props.length}
     rowsPerPage={this.props.rowsPerPage}
     page={this.props.page}
     backIconButtonProps={{
       'aria-label': 'previous page',
       width:'10%'
     }}
     nextIconButtonProps={{
       'aria-label': 'next page',
     }}
     onChangePage={this.props.handleChangePage}
     onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
     classes={{
         toolbar: classes.toolbar,
         caption: classes.caption
       }}

   />
   </div>


    );

  }
}

Pagination.propTypes = {
  length: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,

};


export default withStyles(useStyles)(Pagination);
