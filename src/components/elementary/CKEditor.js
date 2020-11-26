import React, {useState} from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";

function CkEditor(props) {
  const [data, setData] = useState(props.data);

  const handleChange = (event, editor) => {
    setData(editor.getData());
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        onInit={(editor) => {
          editor.setData(data)
        }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.handleSave(data, props.index)}
      >
        Save and Close
      </Button>
    </div>
  );
}

export default CkEditor;
