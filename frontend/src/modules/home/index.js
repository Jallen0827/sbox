import React, { PureComponent, useState } from 'react'
import Snackbar from '../../components/snackbar'
import Button from '../../components/button'

import './home.css'
import Logo from '../../components/logo'

import { createFile } from '../../api/file'

const Home = ()=> {
  const [fileName, setFileName] = useState('')
  const [isSnackbarOpen, SetIsSnackbarOpen] = useState() 
  const [isSuccess, SetIsSuccess] = useState('success')

  function uploadFile(e) {
    const file = e.target.files[0]
    e.target.value = null
    
    
    if(file.size >= 10*1024*1024){
      SetIsSnackbarOpen(true)
      setFileName('File is to large. Must be under 10MB')
      SetIsSuccess('fail') 
      return
    }

    createFile(file)
      .then((response) => {
        if (response && response.status === 200) {
          const fileName = response.data.name ? response.data.name:'File'
          SetIsSnackbarOpen(true)
          setFileName(fileName)
          SetIsSuccess('success')        
        }
      })
  }

   function onSnackbarClose(reason) {
    if (reason === 'clickaway') {
      return
    }

   SetIsSnackbarOpen(false)
  }


    return (
      <div className='home'>
        <Logo className='logo' />
        <input
          accept='*'
          style={{ display: 'none' }}
          id='outlined-button-file'
          type='file'
          onChange={(e)=>uploadFile(e)}
        />
        <label htmlFor='outlined-button-file'>
          <Button
            className='upload-button'
            variant='outlined'
            size='large'
            color='primary'
            component='span'
          >
            Upload File
          </Button>
        </label>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={onSnackbarClose}
          variant={isSuccess==='success'? 'success':'fail'}
          message={`
            ${fileName ? fileName : 'File'}
            uploaded
          `}
        />
      </div>
    )
}
// Home.propTypes = {}
// Home.defaultProps = {}

export default Home
