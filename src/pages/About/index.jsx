import { useLocation } from 'react-router-dom'
import './index.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ThreeCircles } from 'react-loader-spinner';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useFetch from "../../hooks/useFetch";


function About() {
    const location = useLocation();
    console.log(location.state.data);

    const datas = useFetch(
        `${import.meta.env.VITE_API}/v1.4/movie/${location.state.data}`
    );
    console.log(datas);

  return (
    !datas.loading 
    ? 
        <div className='about'>
        <div style={{width: '50%', height: '100%'}}  className="card mb-3">
            <img style={{width: '100%', height: '38vh'}} src={datas.data ? `${datas.data.poster.url}`:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Tv6hC5RRm6YaHOj3_ge90KeNPIxpgiiaTw&usqp=CAU`} className='card-img-top' alt="image" />
            <div className="card-body">
                <h5 className="card-title">{datas.data ? datas.data.name : "Name"}</h5>
                <p className="card-text1">YEAR: {datas.data ? datas.data.year : "0000"}</p>
                <p className="card-text">{datas.data ? datas.data.description : "Description"}</p>
            </div>
        </div>
        <div>
            <div className="card-wrapper">
                <Card className='card-box'>
                    <CardActionArea className='card-action'>
                        <img className='image' src={datas.data ? `${datas.data.persons[0].photo}`:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Tv6hC5RRm6YaHOj3_ge90KeNPIxpgiiaTw&usqp=CAU`} alt="" />
                        <CardContent className='title'>
                        <Typography gutterBottom variant="h5" component="div">
                            {datas.data ? datas.data.persons[0].name : "Lizard"}
                        </Typography>
                        <Typography className='text1' variant="body2" color="text.secondary">
                        {datas.data ? datas.data.persons[0].profession : 'Actor'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {datas.data ? datas.data.persons[0].description : " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className='card-box'>
                <CardActionArea className='card-action'>
                    <img className='image' src={datas.data ? `${datas.data.persons[1].photo}`:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Tv6hC5RRm6YaHOj3_ge90KeNPIxpgiiaTw&usqp=CAU`} alt="" />
                    <CardContent className='title'>
                    <Typography gutterBottom variant="h5" component="div">
                        {datas.data ? datas.data.persons[1].name : "Lizard"}
                    </Typography>
                    <Typography className='text1' variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[1].profession : 'Actor'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[1].description : " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                <Card className='card-box'>
                <CardActionArea className='card-action'>
                    <img className='image' src={datas.data ? `${datas.data.persons[3].photo}`:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Tv6hC5RRm6YaHOj3_ge90KeNPIxpgiiaTw&usqp=CAU`} alt="" />
                    <CardContent className='title'>
                    <Typography gutterBottom variant="h5" component="div">
                        {datas.data ? datas.data.persons[3].name : "Lizard"}
                    </Typography>
                    <Typography className='text1' variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[3].profession : 'Actor'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[3].description : " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                <Card className='card-box'>
                <CardActionArea className='card-action'>
                    <img className='image' src={datas.data ? `${datas.data.persons[5].photo}`:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Tv6hC5RRm6YaHOj3_ge90KeNPIxpgiiaTw&usqp=CAU`} alt="" />
                    <CardContent className='title'>
                    <Typography gutterBottom variant="h5" component="div">
                        {datas.data ? datas.data.persons[5].name : "Lizard"}
                    </Typography>
                    <Typography className='text1' variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[5].profession : 'Actor'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {datas.data ? datas.data.persons[5].description : " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </div>
        </div>
        <h1 className='titile1'>
            <h2>P</h2>
            <h2>E</h2>
            <h2>S</h2>
            <h2>O</h2>
            <h2>N</h2>
            <h2>A</h2>
            <h2>L</h2>
        </h1>
        </div>
    :
        <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass="threeCircle"
    />
  )
}

export default About