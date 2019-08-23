import React, { useState } from "react";
import {axiosWithAuth} from "../utilities/axiosWithAuth";



    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // make a delete request to delete this color

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addAColor = color => {
    setAdding(true)
    setColorToAdd(color)
  };

  const deleteColor = (event, colorToEdit) => {
    event.preventDefault();
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(results => {
        console.log("color edit results: ", results)
        const newArray = colors.filter(color => color.id !== colorToEdit.id)
        updateColors(newArray)
      })
      .catch(error => console.log("Error with color edit: ", error.response))
  };

  const saveEdit = (event, colorToEdit) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(results => {
        updateColors(colors.map(color => color.id !== colorToEdit.id ? color : results.data))
        setColorToEdit(initialColor)
      })
      .catch(error => console.log("Error with color edit SAVE: ", error.response))
  };


  const addColor = (event, colorToAdd) => {
    event.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(results => {
        getColors();
        setColorToAdd(initialColor)
      })
      .catch(error => console.log("Error with Add color: ", error))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={(event) => deleteColor(event, color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={(event) => saveEdit(event, colorToEdit)}>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}


          
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit" onClick={(event) => addColor(event, colorToAdd)}>save</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </div>
      </form>

    </div>
  );
};

export default ColorList;
