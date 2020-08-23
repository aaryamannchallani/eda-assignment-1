From ubuntu
RUN mkdir /mainframe

WORKDIR /mainframe
COPY ./ZDT_Install_EE_V12.0.5.0.x86_64 .
COPY ./script.f .

RUN dpkg --add-architecture i386
RUN apt-get -y install apt-utils perl systemd
RUN apt-get -y install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 lib32stdc++6 libasound2 gfortran inotify-tools

RUN ./ZDT_Install_EE_V12.0.5.0.x86_64  --install --zdtem --dep

EXPOSE 1947, 9450, 9451, 3270

CMD ["gfortran","-ffree-form","script.f"]

ENTRYPOINT ["/home/ibmsys1/volumes/entry.sh"]
