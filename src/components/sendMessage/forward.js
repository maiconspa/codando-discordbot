module.exports = (client, activeServer) => client.on('message', msg => {

  if (msg.channel.type == 'dm') {
    if (msg.author !== client.user) {
         const channel =   client.guilds.cache.find(g => g.id === activeServer.server_id).channels.cache.find(ch => ch.id == activeServer.text_channel.mensagens_cody);
         channel.send("** Mensagem enviada por **: "+ msg.channel.recipient.username + "#" + msg.channel.recipient.discriminator +"\n ** Conteúdo: **"
                                                    +  msg.content)
    }
  }
})