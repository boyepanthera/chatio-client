import React, { useState, useEffect, useContext } from 'react'
import socketIOClient from 'socket.io-client'
import { Notifications } from 'react-push-notification'
import addNotification from 'react-push-notification'
import chatSound from '../assets/chat/messenger.mp3'
import { Context } from '../Store'
import { GetMessages } from '../services/Message.service'

let socket

function Conversation() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [received, setReceived] = useState([])
  const { state } = useContext(Context)

  useEffect(() => {
    ;(() => {
      const playSound = (audioFile) => {
        audioFile.play()
      }
      socket = socketIOClient('http://localhost:9001')
      const messageAudio = new Audio(chatSound)
      socket.on('Received', (data) => {
        playSound(messageAudio)
        addNotification({
          title: 'Notification',
          subtitle: 'This is a subtitle',
          message: data,
          vibrate: 10,
          theme: 'darkblue',
          native: true, // when using native, your OS will handle theming.
        })
        setReceived((received) => [...received, data])
      })
    })()
  }, [])

  useEffect(() => {
    const FetchMessages = async () => {
      try {
        let { data } = await GetMessages({
          token: state.token,
          userId: state.loggedUser._id,
        })
        setMessages(data.messages)
      } catch (err) {
        console.log(err)
      }
    }
    FetchMessages()
  }, [])

  return (
    <div className='App'>
      <Notifications />
      <div>
        <div>
          {state?.loggedInUser?.userName}: {state?.loggedInUser?._id}
        </div>
        {received.map((message) => (
          <div>{message}</div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(text)
            //const socket = socketIOClient("http://127.0.0.1:9001");
            socket.emit('send-message', text)
            setText('')
          }}
        >
          <div>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button>Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Conversation
