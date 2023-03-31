import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    maxHeight: '600px',
    width: '50vw',
    [theme.breakpoints.down('sm')]: {
        width:'100%'
      }

  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  commentrsContainer:{
    margin: "2rem 0rem",
  },
  singleComment:{
    marginBottom: "1rem",
    fontSize:"1.2rem"
  },
  commentsMainContainer: {
    maxHeight: "67vh",
    overflowY: 'auto',
  },
  textarea:{
    outline: "none",
    overflowY: "auto",
    fontSize: "1rem",
  },
  container:{
    marginTop: "3rem",
  },
  btn:{
    height: "fit-content", 
    borderRadius: "10rem",
    background: "none",
    border: "none",
    textAlign: "center",
    display: "flex",
    cursor: "pointer",
    color: "#63e74d",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0.4rem",
  },
  form:{
    display: "flex",
    alignItems: "end",
  }

}));