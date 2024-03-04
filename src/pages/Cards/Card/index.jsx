import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const [isSaved, setIsSaved] = useState(() => {
    const save = localStorage.getItem('save');
    return save ? JSON.parse(save).some(item => item.id === props.docs.id) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const save = localStorage.getItem('save');
    if (save) {
      setIsSaved(JSON.parse(save).some(item => item.id === props.docs.id));
    }
  }, [props.docs.id]);

  function handleSave(e) {
    e.preventDefault(); // Prevent the default action of the label
    e.stopPropagation(); // Prevent propagation to the card click event
    const updatedSave = localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : [];
    const alreadySaved = updatedSave.some(item => item.id === props.docs.id);

    if (!alreadySaved) {
      updatedSave.push(props.docs);
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
    navigate('/about', { state: { data: props.docs.id } });
  }

  return (
    <div onClick={handleClick} className="card" style={{backgroundImage: `url("${props.docs.poster.url}")`}}>
      <div className="cardd">
        <input className='checkbox' type="checkbox" name="bookmark" id={props.docs.id} />
        <label className="bookmark" htmlFor={props.docs.id} onClick={handleSave}>
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
            className='BookmarkIcon'
          />
        </label>
        <div className="textWrapper">
          <p className="text">{props.docs.year} - {props.docs.type} - {props.docs.countries[0].name}</p>
          <p className="title">{props.docs.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
