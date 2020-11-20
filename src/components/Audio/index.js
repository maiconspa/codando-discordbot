module.exports = (client, activeServer) =>
  client.on("message", (msg) => {
    const channel = client.guilds.cache
      .find((g) => g.id === activeServer.server_id)
      .channels.cache.find((ch) => ch.id == activeServer.voice_channel.talks);

    const isDiretoriaMember = (msg) => {
      let result = false;

      client.guilds.cache
        .filter((server) => server.id === activeServer.server_id)
        .map((server) => {
          server.roles.cache
            .filter((role) => role.name.toLowerCase() === "diretoria")
            .map((diretoria) => (roleId = diretoria.id));

          server.members.cache.map(
            (member) =>
              member.user.username.toLowerCase() ===
                msg.channel.recipient.username.toLowerCase() &&
              member.user.discriminator ===
                msg.channel.recipient.discriminator &&
              (result = true)
          );
        });

      return result;
    };

    if (msg.channel.type == "dm") {
      if (msg.author !== client.user) {
        if (
          msg.content.toLowerCase().indexOf("voice") != -1 &&
          msg.content.toLowerCase().indexOf("--log") != -1
        ) {
          if (isDiretoriaMember) {
            if (msg.content.toLowerCase().indexOf("-m") != -1) {
              channel.members.map((u) =>
                u.send(
                  msg.content
                    .replace("-m", "")
                    .replace("--log", "")
                    .replace("voice", "")
                    .trim()
                )
              );
            } else {
              channel.members.map((u) =>
                msg.reply(u.user.username + "#" + u.user.discriminator)
              );
            }
          } else {
            msg.reply(
              "Você não tem autorização para utilizar este comando, me leve para comer pizza e talvez você possa utilizá-lo 🍕😋"
            );
          }
        }
      }
    }

    /*  const channel =   client.guilds.cache.find(g => g.id === activeServer.server_id).channels.cache.find(ch => ch.id == activeServer.voice_channel.talks);
  channel.join()
  const channelcaixa =   client.guilds.cache.find(g => g.id === activeServer.server_id).channels.cache.find(ch => ch.id == activeServer.text_channel.mensagens_cody);
  channel.members.map( u => console.log( u.user.username+'#' + u.user.discriminator) )
  if(newMember.member === oldMember.member) {
    channel.members.map( u => console.log(u.user.username+'#' + u.user.discriminator) )
  }
  msg.reply
*/
  });
