import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {ProductListStores} from '@/store/store.js'
import {observer} from 'mobx-react'

let toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
 
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
 
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
 
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']  
  ]

@observer
class ProductEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } 
        this.modules  = {
            toolbar: toolbarOptions,
            
          };
      }
      componentWillMount(){
        if(this.props.shortOrNo){
          this.setState({
            text:this.props.editContent.productShortDes
          })
        }else{
          this.setState({
            text:this.props.editContent.productDescription
          })
        }
      }
      handleChange=(value)=> {
        // this.setState({ text: value })
        // console.log(this.props.editContent);
        // value = this.props.editContent
        
        
        if(this.props.shortOrNo){
            value = this.props.editContent.productShortDes
            // console.log(value);
            ProductListStores.changeShortDescriptionState(value)
        }else{
            value = this.props.editContent.productDescription
            // console.log(value);
            ProductListStores.changeProductDescriptionState(value)
        }
      }
    
      render() {
        return (
          <ReactQuill
                    style= {{ width:"920px"}}
                    value={this.state.text}
                    onChange={this.handleChange}
                    modules = {this.modules}
                      />
        )
      }
}

export default ProductEditor;