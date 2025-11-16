import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { mockSupportTickets } from '../data/supportTickets';

const ContactSupportScreen: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [priority] = useState('Medium');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <TextInput value={subject} onChangeText={setSubject} placeholder="Subject" placeholderTextColor="#888" style={styles.input} />
      <View style={styles.input}><Text style={{color:'#bbb'}}>Priority</Text>
        {/* simple select replacement */}
        <Text style={{color:'#fff', marginTop:6}}>{priority}</Text>
      </View>
      <TextInput value={message} onChangeText={setMessage} placeholder="Message" placeholderTextColor="#888" style={[styles.input, {height:120}]} multiline/>
      <TouchableOpacity style={styles.submit}><Text style={{color:'#fff'}}>Submit Request</Text></TouchableOpacity>

      <Text style={{color:'#fff', marginTop:12, marginBottom:8}}>Recent Tickets</Text>
      {mockSupportTickets.map(t => (
        <View key={t.id} style={styles.ticket}><Text style={{color:'#fff', fontWeight:'700'}}>{t.title}</Text><Text style={{color:'#bbb'}}>{t.status} • {t.createdAt}</Text></View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#0f0f0f', padding:16},
  title:{color:'#fff', fontSize:20, fontWeight:'700', marginBottom:12},
  input:{backgroundColor:'#121212', padding:10, borderRadius:10, color:'#fff', marginBottom:12},
  submit:{backgroundColor:'#00e676', padding:12, borderRadius:10, alignItems:'center'},
  ticket:{backgroundColor:'#121212', padding:10, borderRadius:10, marginBottom:8}
});

export default ContactSupportScreen;
