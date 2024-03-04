import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import play from '../../../assets/play.svg'

function All(props) {
  const [isSaved, setIsSaved] = useState(() => {
    const save = localStorage.getItem('save');
    return save ? JSON.parse(save).some(item => item.id === props.docs.id) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const save = localStorage.getItem('save');
    if (save) {
      setIsSaved(JSON.parse(save).some(item => item.id === props.docs.id));
      // handleSubmit("access");
    }
  }, [props.docs.id]);



  function handleSave(e) {
    e.preventDefault(); // Prevent the default action of the label
    e.stopPropagation(); 
    const updatedSave = localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : [];
    const alreadySaved = updatedSave.some(item => item.id === props.docs.id);

    if (!alreadySaved) {
      updatedSave.push(props.docs); // Push new item to the updated array
      localStorage.setItem('save', JSON.stringify(updatedSave));
      setIsSaved(true);
    } else {
      handleDelete();
    }
  }

  function handleDelete() {
    const updatedSave = JSON.parse(localStorage.getItem('save')).filter(el => el.id !== props.docs.id);
    localStorage.setItem('save', JSON.stringify(updatedSave));
    setIsSaved(false);
  }



  function handleClick() {
    navigate('/about', {state:{data:props.docs.id}})
  }

  function handleSubmit() {
    props.onChanges(props.docs.id);
  }

  return (
    <div onClick={handleClick} className="wrap">
        <div className="box" style={{backgroundImage: `url("${props.docs.poster.url}")`, backgroundSize: '100% 100%'}}>
        <div className="dark-box">
        <input className='checkbox' type="checkbox" name="bookmark" id='bookmarks' />
        <label className="bookmarkk" htmlFor='bookmarks'  onClick={handleSave}>
            <BookmarkBorderIcon
            sx={{
                width:'20px',
                height:'24px',
                display: !isSaved ? 'block' : 'none'
            }}
            className='BookmarkBorderIcon'
            />
            <BookmarkIcon
            sx={{
                width:'20px',
                height:'24px',
                display: isSaved ? 'block' : 'none'
            }}
            onClick={isSaved && handleSubmit}
            className='BookmarkIcon'
            />
        </label>
        <span className='hover-play'> <img src={play} alt="play button" />Play</span>
        <div className="textWrapper">
        </div>
        </div>
    </div>
    <p className="text">{props.docs.year} - {props.docs.type} - {props.docs.countries[0].name}</p>
    <h3 className="title">{props.docs.name}</h3>
    </div>
  );
}

export default All;
