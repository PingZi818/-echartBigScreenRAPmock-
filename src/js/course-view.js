var
    dataType = $('.filter-type li.active').data('type'),
    featuresDataArr;
var currentBaseAreaId;
var echart1 = echarts.init(document.getElementById('main1'));
var echart2 = echarts.init(document.getElementById('main2'));
var echart3 = echarts.init(document.getElementById('main3'));
var echart4 = echarts.init(document.getElementById('main4'));
var echart5 = echarts.init(document.getElementById('main5'));
var echart6 = echarts.init(document.getElementById('main6'));
var echart7 = echarts.init(document.getElementById('main7'));
var echart8 = echarts.init(document.getElementById('main8'));
var echart9 = echarts.init(document.getElementById('main9'));
var echart10 = echarts.init(document.getElementById('main10'));

setOptionClassBuild(0, 0);
setOptionlivingData(0, 0, 0, 0);
scheduleClassStatus(0, 0);
courseAnalysisSetOption([{value: 0, name: '故障数'}], 0);
//获取当前时间
getNowFormatDate();
//选择行政区
//根据参数填充页面，以及渲染地图
function resetData(baseAreaId, areaCode) {
    dateMapRegisterCode = areaCode;
    if (areaCode == '000000') {
        dateMapRegisterCode = 'china';
    }
    var jsonPath = areaCodeToFile[areaCode];
    if (!jsonPath) {
        $.ajax({
            url: BACK_ROOT + '/bigscreen/area/getarealevel3code.do',
            data: {baseAreaId: baseAreaId},
            async: false,
            success: function (data) {
                dateMapRegisterCode = data;
                jsonPath = areaCodeToFile[data];
            }
        });
    }

    if (!jsonPath) {
        mapDataExist = false;
        return false;
    }
    mapDataExist = true;
    $.ajax({
        url: 'resource/data/' + jsonPath,
        async: false,
        success: function (mapJson) {
            echarts.registerMap(dateMapRegisterCode, mapJson);
            featuresDataArr = mapJson.features;
        }
    });
}

var mapJson = {
    "type": "FeatureCollection",
    "features": [{
        "id": "710000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@°Ü¯Û", "@@ƛĴÕƊÉɼģºðʀ\\ƎsÆNŌÔĚänÜƤɊĂǀĆĴĤǊŨxĚĮǂƺòƌâÔ®ĮXŦţƸZûÐƕƑGđ¨ĭMó·ęcëƝɉlÝƯֹÅŃ^Ó·śŃǋƏďíåɛGɉ¿IċããF¥ĘWǬÏĶñÄ", "@@\\p|WoYG¿¥Ij@", "@@¡@V^RqBbAnTXeQr©C", "@@ÆEEkWqë I"]],
            "encodeOffsets": [[[122886, 24033], [123335, 22980], [122375, 24193], [122518, 24117], [124427, 22618]]]
        },
        "properties": {"cp": [121.0254,
            23.5986], "name": "台湾", "childNum": 5}
    }, {
        "id": "130000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@\\aM`Ç½ÓnUKĜēs¤­©yrý§uģcJ»eIP]ªrºc_ħ²G¼s`jÎŸnüsÂľP", "@@U`Ts¿mÄ", "@@FOhđ©OiÃ`ww^ÌkÑH«ƇǤŗĺtFu{Z}Ö@U´ʚLg®¯Oı°Ãw ^VbÉsmAê]]w§RRl£ŭuwNÁ`ÇFēÝčȻuT¡Ĺ¯Õ¯sŗő£YªhVƍ£ƅnëYNgq¼ś¿µı²UºÝUąąŖóxV@tƯJ]eR¾fe|rHA|h~Ėƍl§ÏjVë` ØoÅbbx³^zÃĶ¶Sj®AyÂhðk`«PËµEFÛ¬Y¨Ļrõqi¼Wi°§Ð±²°`[À|ĠO@ÆxO\\ta\\p_Zõ^û{ġȧXýĪÓjùÎRb^Î»j{íděYfíÙTymńŵōHim½éŅ­aVcř§ax¹XŻácWU£ôãºQ¨÷Ñws¥qEHÙ|šYQoŕÇyáĂ£MÃ°oťÊP¡mWO¡v{ôvîēÜISpÌhp¨ jdeŔQÖjX³àĈ[n`Yp@UcM`RKhEbpŞlNut®EtqnsÁgAiúoHqCXhfgu~ÏWP½¢G^}¯ÅīGCÑ^ãziMáļMTÃƘrMc|O_¯Ŏ´|morDkO\\mĆJfl@cĢ¬¢aĦtRıÒXòë¬WP{ŵǫƝīÛ÷ąV×qƥV¿aȉd³BqPBmaËđŻģmÅ®V¹d^KKonYg¯XhqaLdu¥Ípǅ¡KąÅkĝęěhq}HyÃ]¹ǧ£Í÷¿qágPmoei¤o^á¾ZEY^Ný{nOl±Í@Mċèk§daNaÇį¿]øRiiñEūiǱàUtėGyl}ÓM}jpEC~¡FtoQiHkk{ILgĽxqÈƋÄdeVDJj£J|ÅdzÂFt~KŨ¸IÆv|¢r}èonb}`RÎÄn°ÒdÞ²^®lnÐèĄlðÓ×]ªÆ}LiĂ±Ö`^°Ç¶p®đDcŋ`ZÔ¶êqvFÆN®ĆTH®¦O¾IbÐã´BĐɢŴÆíȦpĐÞXR·nndO¤OÀĈƒ­QgµFo|gȒęSWb©osx|hYhgŃfmÖĩnºTÌSp¢dYĤ¶UĈjlǐpäðëx³kÛfw²Xjz~ÂqbTÑěŨ@|oMzv¢ZrÃVw¬ŧĖ¸f°ÐTªqs{S¯r æÝl¼ÖĞ ǆiGĘJ¼lr}~K¨ŸƐÌWö¼Þ°nÞoĦL|C~D©|q]SvKÑcwpÏÏĿćènĪWlĄkT}¬Tp~®Hgd˒ĺBVtEÀ¢ôPĎƗè@~kü\\rÊĔÖæW_§¼F´©òDòjYÈrbĞāøŀG{ƀ|¦ðrb|ÀH`pʞkvGpuARhÞÆǶgĘTǼƹS£¨¡ù³ŘÍ]¿ÂyôEP xX¶¹ÜO¡gÚ¡IwÃé¦ÅBÏ|Ç°N«úmH¯âbęU~xĈbȒ{^xÖlD¸dɂ~"]],
            "encodeOffsets": [[[120023, 41045], [121616, 39981], [122102, 42307]]]
        },
        "properties": {"cp": [ 115.4004,
            37.9688], "name": "河北", "childNum": 3}
    }, {
        "id": "140000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@ħÜ_ªlìwGkÛÃǏokćiµVZģ¡coTSË¹ĪmnÕńehZg{gtwªpXaĚThȑp{¶Eh®RćƑP¿£PmcªaJyý{ýȥoÅîɡųAďä³aÏJ½¥PG­ąSM­sWz½µÛYÓŖgxoOkĒCo­Èµ]¯_²ÕjāK~©ÅØ^ÔkïçămÏk]­±cÝ¯ÑÃmQÍ~_apm~ç¡qu{JÅŧ·Ls}EyÁÆcI{¤IiCfUcƌÃp§]ě«vD@¡SÀµMÅwuYY¡DbÑc¡h×]nkoQdaMç~eDÛtT©±@¥ù@É¡ZcW|WqOJmĩl«ħşvOÓ«IqăV¥D[mI~Ó¢cehiÍ]Ɠ~ĥqX·eƷn±}v[ěďŕ]_œ`¹§ÕōIo©b­s^}Ét±ū«³p£ÿ¥WÑxçÁ«h×u×¥ř¾dÒ{ºvĴÎêÌɊ²¶ü¨|ÞƸµȲLLúÉƎ¤ϊęĔV`_bªS^|dzY|dz¥pZbÆ£¶ÒK}tĦÔņƠPYznÍvX¶Ěn ĠÔzý¦ª÷ÑĸÙUȌ¸dòÜJð´ìúNM¬XZ´¤ŊǸ_tldI{¦ƀðĠȤ¥NehXnYGR° ƬDj¬¸|CĞKqºfƐiĺ©ª~ĆOQª ¤@ìǦɌ²æBÊTĞHƘÁĪËĖĴŞȀÆÿȄlŤĒötÎ½î¼ĨXh|ªM¤ÐzÞĩÒSrao³"],
            "encodeOffsets": [[117016, 41452]]
        },
        "properties": {"cp": [ 112.4121,
            37.6611], "name": "山西", "childNum": 1}
    }, {
        "id": "150000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@ǪƫÌÛMĂ[`ÕCn}¶Vcês¯PqFB|S³C|kñHdiÄ¥sŉÅPóÑÑE^ÅPpy_YtShQ·aHwsOnŉÃs©iqjUSiº]ïW«gW¡ARëśĳĘů`çõh]y»ǃǛҤxÒm~zf}pf|ÜroÈzrKÈĵSƧż؜Ġu~è¬vîS¼ĂhĖMÈÄw\\fŦ°W ¢¾luŸDw\\Ŗĝ", "@@GVu»Aylßí¹ãe]Eāò³C¹ð¾²iÒAdkò^P²CǜңǄ z¼g^èöŰ_Ĳĕê}gÁnUI«m]jvV¼euhwqAaW_µj»çjioQR¹ēÃßt@r³[ÛlćË^ÍÉáGOUÛOB±XkÅ¹£k|e]olkVÍ¼ÕqtaÏõjgÁ£§U^RLËnX°ÇBz^~wfvypV ¯ƫĉ˭ȫƗŷɿÿĿƑ˃ĝÿÃǃßËőó©ǐȍŒĖM×ÍEyxþp]ÉvïèvƀnÂĴÖ@V~Ĉ³MEĸÅĖtējyÄDXÄxGQuv_i¦aBçw˛wD©{tāmQ{EJ§KPśƘƿ¥@sCTÉ}ɃwƇy±gÑ}T[÷kÐç¦«SÒ¥¸ëBX½HáÅµÀğtSÝÂa[ƣ°¯¦Pï¡]£ġÒk®G²èQ°óMq}EóƐÇ\\@áügQÍu¥FTÕ¿Jû]|mvāÎYua^WoÀa·­ząÒot×¶CLƗi¯¤mƎHǊ¤îìɾŊìTdåwsRÖgĒųúÍġäÕ}Q¶¿A[¡{d×uQAMxVvMOmăl«ct[wº_ÇÊjbÂ£ĦS_éQZ_lwgOiýe`YYJq¥IÁǳ£ÙË[ÕªuƏ³ÍTs·bÁĽäė[b[ŗfãcn¥îC¿÷µ[ŏÀQ­ōĉm¿Á^£mJVmL[{Ï_£F¥Ö{ŹA}×Wu©ÅaųĳƳhB{·TQqÙIķËZđ©Yc|M¡LeVUóK_QWk_ĥ¿ãZ»X\\ĴuUèlG®ěłTĠğDŃGÆÍz]±ŭ©Å]ÅÐ}UË¥©TċïxgckfWgi\\ÏĒ¥HkµEë{»ÏetcG±ahUiñiWsɁ·cCÕk]wȑ|ća}wVaĚá G°ùnM¬¯{ÈÐÆA¥ÄêJxÙ¢hP¢ÛºµwWOóFÁz^ÀŗÎú´§¢T¤ǻƺSėǵhÝÅQgvBHouʝl_o¿Ga{ïq{¥|ſĿHĂ÷aĝÇqZñiñC³ª»E`¨åXēÕqÉû[l}ç@čƘóO¿¡FUsAʽīccocÇS}£IS~ălkĩXçmĈŀÐoÐdxÒuL^T{r@¢ÍĝKén£kQyÅõËXŷƏL§~}kq»IHėǅjĝ»ÑÞoå°qTt|r©ÏS¯·eŨĕx«È[eM¿yupN~¹ÏyN£{©għWí»Í¾səšǅ_ÃĀɗ±ąĳĉʍŌŷSÉA±åǥɋ@ë£R©ąP©}ĹªƏj¹erLDĝ·{i«ƫC½ÉshVzGS|úþXgp{ÁX¿ć{ƱȏñZáĔyoÁhA}ŅĆfdŉ_¹Y°ėǩÑ¡H¯¶oMQqð¡Ë|Ñ`ƭŁX½·óÛxğįÅcQs«tȋǅFù^it«Č¯[hAi©á¥ÇĚ×l|¹y¯Kȝqgů{ñǙµïċĹzŚȭ¶¡oŽäÕG\\ÄT¿Òõr¯LguÏYęRƩɷŌO\\İÐ¢æ^Ŋ ĲȶȆbÜGĝ¬¿ĚVĎgª^íu½jÿĕęjık@Ľ]ėl¥ËĭûÁėéV©±ćn©­ȇÍq¯½YÃÔŉÉNÑÅÝy¹NqáʅDǡËñ­ƁYÅy̱os§ȋµʽǘǏƬɱàưN¢ƔÊuľýľώȪƺɂļxZĈ}ÌŉŪĺœĭFЛĽ̅ȣͽÒŵìƩÇϋÿȮǡŏçƑůĕ~Ç¼ȳÐUfdIxÿ\\G zâɏÙOº·pqy£@qþ@Ǟ˽IBäƣzsÂZÁàĻdñ°ŕzéØűzșCìDȐĴĺf®Àľưø@ɜÖÞKĊŇƄ§͑těï͡VAġÑÑ»d³öǍÝXĉĕÖ{þĉu¸ËʅğU̎éhɹƆ̗̮ȘǊ֥ड़ࡰţાíϲäʮW¬®ҌeרūȠkɬɻ̼ãüfƠSצɩςåȈHϚÎKǳͲOðÏȆƘ¼CϚǚ࢚˼ФÔ¤ƌĞ̪Qʤ´¼mȠJˀƲÀɠmɆǄĜƠ´ǠN~ʢĜ¶ƌĆĘźʆȬ˪ĚĒ¸ĞGȖƴƀj`ĢçĶāàŃºēĢĖćYÀŎüôQÐÂŎŞǆŞêƖoˆDĤÕºÑǘÛˤ³̀gńƘĔÀ^ªƂ`ªt¾äƚêĦĀ¼ÐĔǎ¨Ȕ»͠^ˮÊȦƤøxRrŜH¤¸ÂxDÄ|ø˂˜ƮÐ¬ɚwɲFjĔ²Äw°ǆdÀÉ_ĸdîàŎjÊêTĞªŌŜWÈ|tqĢUB~´°ÎFCU¼pĀēƄN¦¾O¶łKĊOjĚj´ĜYp{¦SĚÍ\\T×ªV÷Ší¨ÅDK°ßtŇĔK¨ǵÂcḷ̌ĚǣȄĽFlġUĵŇȣFʉɁMğįʏƶɷØŭOǽ«ƽū¹Ʊő̝Ȩ§ȞʘĖiɜɶʦ}¨֪ࠜ̀ƇǬ¹ǨE˦ĥªÔêFxúQEr´Wrh¤Ɛ \\talĈDJÜ|[Pll̚¸ƎGú´P¬W¦^¦H]prRn|or¾wLVnÇIujkmon£cX^Bh`¥V¦U¤¸}xRj[^xN[~ªxQ[`ªHÆÂExx^wN¶Ê|¨ìMrdYpoRzNyÀDs~bcfÌ`L¾n|¾T°c¨È¢ar¤`[|òDŞĔöxElÖdHÀI`Ď\\Àì~ÆR¼tf¦^¢ķ¶eÐÚMptgjɡČÅyġLûŇV®ÄÈƀĎ°P|ªVVªj¬ĚÒêp¬E|ŬÂ_~¼rƐK f{ĘFĒƌXưăkÃĄ}nµo×q£ç­kX{uĩ«āíÓUŅÝVUŌ]Ť¥lyň[oi{¦LĸĦ^ôâJ¨^UZðÚĒL¿Ìf£K£ʺoqNwğc`uetOj×°KJ±qÆġmĚŗos¬qehqsuH{¸kH¡ÊRǪÇƌbȆ¢´äÜ¢NìÉʖ¦â©Ɨؗ"]],
            "encodeOffsets": [[[128500, 52752], [127089, 51784]]]
        },
        "properties": {"cp": [  114.5977,
            43.0408], "name": "内蒙古", "childNum": 2}
    }, {
        "id": "210000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@L@@s]", "@@MnNm", "@@dc", "@@eÀC@b", "@@fXwkbrÄ`qg", "@@^jtWQ", "@@~ Y[c", "@@I`ĖN^_¿ZÁM", "@@Ïxǌ{q_×^Gigp", "@@iX¶BY", "@@YZ", "@@L_yG`b", "@@^WqCTZ", "@@\\[§t|]", "@@m`p[", "@@@é^BntaÊU]x ¯ÄPĲ­°hʙK³VÕ@Y~|EvĹsÇ¦­L^pÃ²ŸÒG Ël]xxÄ_fT¤Ď¤cPC¨¸TVjbgH²sdÎdHt`B²¬GJję¶[ÐhjeXdlwhðSČ¦ªVÊÏÆZÆŶ®²^ÎyÅHńĚDMħĜŁH­kçvV[ĳ¼WYÀäĦ`XlR`ôLUVfK¢{NZdĒªYĸÌÚJRr¸SA|ƴgŴĴÆbvªØX~źB|¦ÕE¤Ð`\\|KUnnI]¤ÀÂĊnŎR®Ő¿¶\\ÀøíDm¦ÎbŨabaĘ\\ľãÂ¸atÎSƐ´©v\\ÖÚÌǴ¤Â¨JKrZ_ZfjþhPkx`YRIjJcVf~sCN¤ EhæmsHy¨SðÑÌ\\\\ĐRÊwS¥fqŒßýáĞÙÉÖ[^¯ǤŲê´\\¦¬ĆPM¯£»uïpùzExanµyoluqe¦W^£ÊL}ñrkqWňûPUP¡ôJoo·U}£[·¨@XĸDXm­ÛÝºGUCÁª½{íĂ^cjk¶Ã[q¤LÉö³cux«|Zd²BWÇ®Yß½ve±ÃCý£W{Ú^q^sÑ·¨ËMr¹·C¥GDrí@wÕKţÃ«V·i}xËÍ÷i©ĝɝǡ]{c±OW³Ya±_ç©HĕoƫŇqr³Lys[ñ³¯OSďOMisZ±ÅFC¥Pq{Ã[Pg}\\¿ghćOk^ĩÃXaĕËĥM­oEqqZûěŉ³F¦oĵhÕP{¯~TÍlªNßYÐ{Ps{ÃVUeĎwk±ŉVÓ½ŽJãÇÇ»Jm°dhcÀffdF~ĀeĖd`sx² ®EĦ¦dQÂd^~ăÔH¦\\LKpĄVez¤NP ǹÓRÆąJSh­a[¦´ÂghwmBÐ¨źhI|VV|p] Â¼èNä¶ÜBÖ¼L`¼bØæKVpoúNZÞÒKxpw|ÊEMnzEQIZZNBčÚFÜçmĩWĪñtÞĵÇñZ«uD±|ƏlǗw·±PmÍada CLǑkùó¡³Ï«QaċÏOÃ¥ÕđQȥċƭy³ÁA"]],
            "encodeOffsets": [[[123686, 41445], [126019, 40435], [124393, 40128], [126117, 39963], [125322, 40140], [126686, 40700], [126041, 40374], [125584, 40168], [125509, 40217], [125453, 40165], [125362, 40214], [125280, 40291], [125774, 39997], [125976, 40496], [125822, 39993], [122731, 40949]]]
        },
        "properties": {"cp": [122.3438,
            41.5889], "name": "辽宁", "childNum": 16}
    }, {
        "id": "220000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@ñr½ÉKāGÁ¤ia ÉÈ¹`\\xs¬dĆkNnuNUwNx¶c¸|\\¢GªóĄ~RãÖÎĢùđŴÕhQxtcæëSɽŉíëǉ£ƍG£nj°KƘµDsØÑpyĆ¸®¿bXp]vbÍZuĂ{n^IüÀSÖ¦EvRÎûh@â[ƏÈô~FNr¯ôçR±­HÑlĢ^¤¢OðætxsŒ]ÞÁTĠs¶¿âÆGW¾ìA¦·TÑ¬è¥ÏÐJ¨¼ÒÖ¼ƦɄxÊ~StD@Ă¼Ŵ¡jlºWvÐzƦZÐ²CH AxiukdGgetqmcÛ£Ozy¥cE}|¾cZk¿uŐã[oxGikfeäT@SUwpiÚFM©£è^Ú`@v¶eňf heP¶täOlÃUgÞzŸU`l}ÔÆUvØ_Ō¬Öi^ĉi§²ÃB~¡ĈÚEgc|DC_Ȧm²rBx¼MÔ¦ŮdĨÃâYxƘDVÇĺĿg¿cwÅ\\¹¥Yĭl¤OvLjM_a W`zļMž·\\swqÝSAqŚĳ¯°kRē°wx^ĐkǂÒ\\]nrĂ}²ĊŲÒøãh·M{yMzysěnĒġV·°G³¼XÀ¤¹i´o¤ŃÈ`ÌǲÄUĞd\\iÖmÈBĤÜɲDEh LG¾ƀÄ¾{WaYÍÈĢĘÔRîĐj}ÇccjoUb½{h§Ǿ{KƖµÎ÷GĄØŜçưÌs«lyiē«`å§H¥Ae^§GK}iã\\c]v©ģZmÃ|[M}ģTɟĵÂÂ`ÀçmFK¥ÚíÁbX³ÌQÒHof{]ept·GŋĜYünĎųVY^ydõkÅZW«WUa~U·SbwGçǑiW^qFuNĝ·EwUtW·Ýďæ©PuqEzwAVXRãQ`­©GYYhcUGorBd}ģÉb¡·µMicF«Yƅ»é\\ɹ~ǙG³mØ©BšuT§Ĥ½¢Ã_Ã½L¡ûsT\\rke\\PnwAKy}ywdSefµ]UhĿD@mÿvaÙNSkCuncÿ`lWėVâ¦÷~^fÏ~vwHCį`xqT­­lW«ï¸skmßEGqd¯R©Ý¯¯S\\cZ¹iűƏCuƍÓXoR}M^o£R}oªU­FuuXHlEÅÏ©¤ßgXþ¤D²ÄufàÀ­XXÈ±Ac{Yw¬dvõ´KÊ£\\rµÄlidā]|î©¾DÂVH¹Þ®ÜWnCķ W§@\\¸~¤Vp¸póIO¢VOŇürXql~òÉK]¤¥Xrfkvzpm¶bwyFoúvð¼¤ N°ąO¥«³[éǣű]°Õ\\ÚÊĝôîŇÔaâBYlďQ[ Ë[ïÒ¥RI|`j]P"],
            "encodeOffsets": [[126831, 44503]]
        },
        "properties": {"cp": [ 126.4746,
            43.5938], "name": "吉林", "childNum": 1}
    }, {
        "id": "230000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@UµNÿ¥īèçHÍøƕ¶Lǽ|g¨|a¾pVidd~ÈiíďÓQġėÇZÎXb½|ſÃH½KFgɱCģÛÇAnjÕc[VĝǱÃËÇ_ £ń³pj£º¿»WH´¯U¸đĢmtĜyzzNN|g¸÷äűÑ±ĉā~mq^[ǁÑďlw]¯xQĔ¯l°řĴrBÞTxr[tŽ¸ĻN_yX`biNKuP£kZĮ¦[ºxÆÀdhĹŀUÈƗCwáZħÄŭcÓ¥»NAw±qȥnD`{ChdÙFć}¢A±Äj¨]ĊÕjŋ«×`VuÓÅ~_kŷVÝyhVkÄãPsOµfgeŇµf@u_Ù ÙcªNªÙEojVxT@ãSefjlwH\\pŏäÀvlY½d{F~¦dyz¤PÜndsrhfHcvlwjF£G±DÏƥYyÏu¹XikĿ¦ÏqƗǀOŜ¨LI|FRĂn sª|C˜zxAè¥bfudTrFWÁ¹Am|ĔĕsķÆF´N}ćUÕ@Áĳſmuçuð^ÊýowFzØÎĕNőǏȎôªÌŒǄàĀÄ˄ĞŀƒʀĀƘŸˮȬƬĊ°Uzouxe]}AyÈW¯ÌmKQ]Īºif¸ÄX|sZt|½ÚUÎ lk^p{f¤lºlÆW A²PVÜPHÊâ]ÎĈÌÜk´\\@qàsĔÄQºpRij¼èi`¶bXrBgxfv»uUi^v~J¬mVp´£´VWrnP½ì¢BX¬hðX¹^TjVriªjtŊÄmtPGx¸bgRsT`ZozÆO]ÒFôÒOÆŊvÅpcGêsx´DR{AEOr°x|íb³Wm~DVjºéNNËÜ˛ɶ­GxŷCSt}]ûōSmtuÇÃĕNāg»íT«u}ç½BĵÞʣ¥ëÊ¡MÛ³ãȅ¡ƋaǩÈÉQG¢·lG|tvgrrf«ptęŘnÅĢrI²¯LiØsPf_vĠdxM prʹL¤¤eËÀđKïÙVY§]Ióáĥ]ķK¥j|pŇ\\kzţ¦šnņäÔVĂîĪ¬|vW®l¤èØrxm¶ă~lÄƯĄ̈́öȄEÔ¤ØQĄĄ»ƢjȦOǺ¨ìSŖÆƬyQv`cwZSÌ®ü±Ǆ]ŀç¬B¬©ńzƺŷɄeeOĨSfm ĊƀP̎ēz©ĊÄÕÊmgÇsJ¥ƔŊśæÎÑqv¿íUOµªÂnĦÁ_½ä@êí£P}Ġ[@gġ}gɊ×ûÏWXá¢užƻÌsNÍ½ƎÁ§čŐAēeL³àydl¦ĘVçŁpśǆĽĺſÊQíÜçÛġÔsĕ¬Ǹ¯YßċġHµ ¡eå`ļrĉŘóƢFìĎWøxÊkƈdƬv|I|·©NqńRŀ¤éeŊŀàŀU²ŕƀBQ£Ď}L¹Îk@©ĈuǰųǨÚ§ƈnTËÇéƟÊcfčŤ^XmHĊĕË«W·ċëx³ǔķÐċJāwİ_ĸȀ^ôWr­°oú¬ĦŨK~ȰCĐ´Ƕ£fNÎèâw¢XnŮeÂÆĶ¾¾xäLĴĘlļO¤ÒĨA¢Êɚ¨®ØCÔ ŬGƠƦYĜĘÜƬDJg_ͥœ@čŅĻA¶¯@wÎqC½Ĉ»NăëKďÍQÙƫ[«ÃígßÔÇOÝáWñuZ¯ĥŕā¡ÑķJu¤E å¯°WKÉ±_d_}}vyõu¬ï¹ÓU±½@gÏ¿rÃ½DgCdµ°MFYxw¿CG£Rƛ½Õ{]L§{qqą¿BÇƻğëܭǊË|c²}Fµ}ÙRsÓpg±QNqǫŋRwŕnéÑÉK«SeYRŋ@{¤SJ}D Ûǖ֍]gr¡µŷjqWÛham³~S«Ü[", "@@ƨĶTLÇyqpÇÛqe{~oyen}s`qiXGù]Ëp½©lÉÁp]Þñ´FĂ^fäîºkàz¼BUv¬D"]],
            "encodeOffsets": [[[134456, 44547], [127123, 51780]]]
        },
        "properties": {"cp": [128.1445,
            47.5156], "name": "黑龙江", "childNum": 2}
    }, {
        "id": "320000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@Õg^vÁbnÀ`Jnĝ¬òM¶ĘTÖŒbe¦¦{¸ZâćNp©Hp|`mjhSEb\\afv`sz^lkljÄtg¤D­¾X¿À|ĐiZȀåB·î}GL¢õcßjayBFµÏC^ĭcÙt¿sğH]j{s©HM¢QnDÀ©DaÜÞ·jgàiDbPufjDk`dPOîhw¡ĥ¥GP²ĐobºrYî¶aHŢ´ ]´rılw³r_{£DB_Ûdåuk|Ũ¯F Cºyr{XFye³Þċ¿ÂkĭB¿MvÛpm`rÚã@Ę¹hågËÖƿxnlč¶Åì½Ot¾dJlVJĂǀŞqvnO^JZż·Q}êÍÅmµÒ]ƍ¦Dq}¬R^èĂ´ŀĻĊIÔtĲyQŐĠMNtR®òLhĚs©»}OÓGZz¶A\\jĨFäOĤHYJvÞHNiÜaĎÉnFQlNM¤B´ĄNöɂtpŬdZÅglmuÇUšŞÚb¤uŃJŴu»¹ĄlȖħŴw̌ŵ²ǹǠ͛hĭłƕrçü±Yrřl¥i`ã__¢ćSÅr[Çq^ùzWmOĈaŐÝɞï²ʯʊáĘĳĒǭPħ͍ôƋÄÄÍīçÛɈǥ£­ÛmY`ó£Z«§°Ó³QafusNıǅ_k}¢m[ÝóDµ¡RLčiXyÅNïă¡¸iĔÏNÌķoıdōîåŤûHcs}~Ûwbù¹£¦ÓCtOPrE^ÒogĉIµÛÅʹK¤½phMú`mR¸¦PƚgÉLRs`£¯ãhD¨|³¤C"],
            "encodeOffsets": [[121451, 32518]]
        },
        "properties": {"cp": [ 120.0586,
            32.915], "name": "江苏", "childNum": 1}
    }, {
        "id": "330000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@jX^n", "@@sfdM", "@@qP\\xz[_i", "@@o\\VzRZ}mECy", "@@R¢FX}°[m]", "@@Cb\\}", "@@e|v\\laus", "@@v~s{", "@@QxÂF©}", "@@¹nvÞs©m", "@@rQgYIh", "@@bi«ZX", "@@p[}ILd", "@@À¿|", "@@¹dnb", "@@rS}[Kl", "@@g~h}", "@@FlCk", "@@ůTG°ĄLHm°UF", "@@OdRe", "@@v[u\\", "@@FjâL~wyoo~sµLZ", "@@¬e¹aH", "@@\\nÔ¡q]L³ë\\ÿ®QÌ", "@@ÊA­©]ª", "@@Kxv{­", "@@@hlIk_", "@@pWcrxp", "@@Md|_iA", "@@¢X£½z\\ðpN", "@@hlÜ[LykAvyfw^E ", "@@fp¤MusH", "@@®_ma~LÁ¬`", "@@@°¡mÛGĕ¨§Ianá[ýƤjfæÐNäGp", "@@iMt\\", "@@Zc[b", "@@X®±GrÆ°Zæĉm", "@@Z~dOSo|A¿qZv", "@@@`EN£p", "@@|s", "@@@nDi", "@@na£¾uYL¯QªmĉÅdMgÇjcº«ę¬­K­´B«Âącoċ\\xK`cįŧ«®á[~ıxu·ÅKsËÉc¢Ù\\ĭƛëbf¹­ģSĜkáƉÔ­ĈZB{aMµfzŉfÓÔŹŁƋǝÊĉ{ğč±g³ne{ç­ií´S¬\\ßðK¦w\\iqªĭiAuA­µ_W¥ƣO\\lċĢttC¨£t`PZäuXßBsĻyekOđġĵHuXBµ]×­­\\°®¬F¢¾pµ¼kŘó¬Wät¸|@L¨¸µrºù³Ù~§WIZW®±Ð¨ÒÉx`²pĜrOògtÁZ{üÙ[|ûKwsPlU[}¦Rvn`hsª^nQ´ĘRWb_ rtČFIÖkĦPJ¶ÖÀÖJĈĄTĚòC ²@PúØz©Pî¢£CÈÚĒ±hŖl¬â~nm¨f©iļ«mntqÒTÜÄjL®EÌFª²iÊxØ¨IÈhhst[Ôx}dtüGæţŔïĬaĸpMËÐjē¢·ðĄÆMzjWKĎ¢Q¶À_ê_@ıi«pZgf¤Nrq]§ĂN®«H±yƳí¾×ŊďŀĐÏŴǝĂíÀBŖÕªÁŐTFqĉ¯³ËCĕģi¨hÜ·ñt»¯Ï", "@@ºwZRkĕWK "]],
            "encodeOffsets": [[[125785, 31436], [125729, 31431], [125513, 31380], [125329, 30690], [125223, 30438], [125115, 30114], [124815, 29155], [124419, 28746], [124095, 28635], [124005, 28609], [125000, 30713], [125111, 30698], [125078, 30682], [125150, 30684], [124014, 28103], [125008, 31331], [125411, 31468], [125329, 31479], [125369, 31139], [125626, 30916], [125417, 30956], [125254, 30976], [125199, 30997], [125095, 31058], [125083, 30915], [124885, 31015], [125218, 30798], [124867, 30838], [124755, 30788], [124802, 30809], [125267, 30657], [125218, 30578], [125200, 30562], [125192, 30787], [124968, 30474], [125167, 30396], [125115, 30363], [124955, 29879], [124714, 29781], [124762, 29462], [124325, 28754], [124863, 30077], [125366, 31477]]]
        },
        "properties": {"cp": [ 120.098,
            29.0918], "name": "浙江", "childNum": 43}
    }, {
        "id": "340000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@^iuLV\\", "@@e©Edh", "@@´CE¶zAXêeödK¡~H¸íæAȽd{ďÅÀ½W®£ChÃsikkly]_teu[bFaTign{]GqªoĈMYá|·¥f¥őaSÕėNµñĞ«Im_m¿Âa]uĜp Z_§{Cäg¤°r[_YjÆOdý[I[á·¥Q_nùgL¾mzˆDÜÆ¶ĊJhpc¹O]iŠ]¥ jtsggDÑ¡w×jÉ©±EFË­KiÛÃÕYvsm¬njĻª§emná}k«ŕgđ²ÙDÇ¤í¡ªOy×Où±@DñSęćăÕIÕ¿IµĥOlJÕÍRÍ|JìĻÒåyķrĕq§ÄĩsWÆßF¶X®¿mwRIÞfßoG³¾©uyHį{Ɓħ¯AFnuPÍÔzVdàôº^Ðæd´oG¤{S¬ćxã}ŧ×Kǥĩ«ÕOEÐ·ÖdÖsƘÑ¨[Û^Xr¢¼§xvÄÆµ`K§ tÒ´Cvlo¸fzŨð¾NY´ı~ÉĔēßúLÃÃ_ÈÏ|]ÂÏHlg`ben¾¢pUh~ƴĖ¶_r sĄ~cƈ]|r c~`¼{À{ȒiJjz`îÀT¥Û³]u}fïQl{skloNdjäËzDvčoQďHI¦rbrHĖ~BmlNRaĥTX\\{fÁKÁ®TLÂÄMtÊgĀDĄXƔvDcÎJbt[¤D@®hh~kt°ǾzÖ@¾ªdbYhüóV´ŮŒ¨Üc±r@J|àuYÇÔG·ĚąĐlŪÚpSJ¨ĸLvÞcPæķŨ®mÐálsgd×mQ¨ųÆ©Þ¤IÎs°KZpĄ|XwWdĎµmkǀwÌÕæhºgBĝâqÙĊzÖgņtÀÁĂÆáhEz|WzqD¹°Eŧl{ævÜcA`¤C`|´qxĲkq^³³GšµbíZ¹qpa±ď OH¦Ħx¢gPícOl_iCveaOjChß¸iÝbÛªCC¿mRV§¢A|tbkĜEÀtîm^g´fÄ"]],
            "encodeOffsets": [[[121722, 32278], [119475, 30423], [121606, 33646]]]
        },
        "properties": {"cp": [ 117.2461,
            32.0361], "name": "安徽", "childNum": 3}
    }, {
        "id": "350000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@zht´}[", "@@aj^~ĆGå", "@@edHse", "@@@vPGsyQ", "@@sBzddW[O", "@@S¨Qy", "@@NVucW", "@@qptB@q", "@@¸[iu", "@@Q\\pD[_", "@@jSwUappI", "@@eXª~", "@@AjvFoo", "@@fT_Çí\\v|ba¦jZÆy|®", "@@IjLg", "@@wJIx«¼AoNe{M¥", "@@K±¡ÓČ~N¾", "@@k¡¹Eh~c®uDqZì¡I~Māe£bN¨gZý¡a±Öcp©PhI¢QqÇGj|¥U g[Ky¬ŏv@OptÉEF\\@ åA¬V{XģĐBycpě¼³Ăp·¤¥ohqqÚ¡ŅLs^Ã¡§qlÀhH¨MCe»åÇGD¥zPO£čÙkJA¼ßėuĕeûÒiÁŧS[¡Uûŗ½ùěcÝ§SùĩąSWó«íęACµeRåǃRCÒÇZÍ¢ź±^dlstjD¸ZpuÔâÃH¾oLUêÃÔjjēò´ĄWƛ^Ñ¥Ħ@ÇòmOw¡õyJyD}¢ďÑÈġfZda©º²z£NjD°Ötj¶¬ZSÎ~¾c°¶ÐmxO¸¢Pl´SL|¥AȪĖMņĲg®áIJČĒü` QF¬h|ĂJ@zµ |ê³È ¸UÖŬŬÀCtrĸr]ðM¤ĶĲHtÏ AĬkvsq^aÎbvdfÊòSD´Z^xPsĂrvƞŀjJd×ŘÉ ®AÎ¦ĤdxĆqAZRÀMźnĊ»İÐZ YXæJyĊ²·¶q§·K@·{sXãô«lŗ¶»o½E¡­«¢±¨Y®Ø¶^AvWĶGĒĢPlzfļtàAvWYãO_¤sD§ssČġ[kƤPX¦`¶®BBvĪjv©jx[L¥àï[F¼ÍË»ğV`«Ip}ccÅĥZEãoP´B@D¸m±z«Ƴ¿å³BRØ¶Wlâþäą`]Z£Tc ĹGµ¶Hm@_©k¾xĨôȉðX«½đCIbćqK³ÁÄš¬OAwã»aLŉËĥW[ÂGIÂNxĳ¤D¢îĎÎB§°_JGs¥E@¤ućPåcuMuw¢BI¿]zG¹guĮI"]],
            "encodeOffsets": [[[123250, 27563], [122541, 27268], [123020, 27189], [122916, 27125], [122887, 26845], [122808, 26762], [122568, 25912], [122778, 26197], [122515, 26757], [122816, 26587], [123388, 27005], [122450, 26243], [122578, 25962], [121255, 25103], [120987, 24903], [122339, 25802], [121042, 25093], [122439, 26024]]]
        },
        "properties": {"cp": [ 118.1008,
            25.9277], "name": "福建", "childNum": 18}
    }, {
        "id": "360000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@ÖP¬ǦĪØLŨä~Ĉw«|TH£pc³Ïå¹]ĉđxe{ÎÓvOEm°BƂĨİ|Gvz½ª´HàpeJÝQxnÀW­EµàXÅĪt¨ÃĖrÄwÀFÎ|Ă¡WÕ¸cf¥XaęST±m[r«_gmQu~¥V\\OkxtL E¢Ú^~ýØkbēqoě±_Êw§Ñ²ÏƟė¼mĉŹ¿NQYBąrwģcÍ¥B­ŗÊcØiIƝĿuqtāwO]³YCñTeÉcaubÍ]trluīBÐGsĵıN£ï^ķqsq¿DūūVÕ·´Ç{éĈýÿOER_đûIċâJh­ŅıNȩĕB¦K{Tk³¡OP·wnµÏd¯}½TÍ«YiµÕsC¯iM¤­¦¯P|ÿUHvhe¥oFTuõ\\OSsMòđƇiaºćXĊĵà·çhƃ÷Ç{ígu^đgm[ÙxiIN¶Õ»lđÕwZSÆv©_ÈëJbVkĔVÀ¤P¾ºÈMÖxlò~ªÚàGĂ¢B±ÌKyñ`w²¹·`gsÙfIěxŕeykpudjuTfb·hh¿Jd[\\LáƔĨƐAĈepÀÂMD~ņªe^\\^§ý©j×cZØ¨zdÒa¶lÒJìõ`oz÷@¤uŞ¸´ôęöY¼HČƶajlÞƩ¥éZ[|h}^U  ¥pĄžƦO lt¸Æ Q\\aÆ|CnÂOjt­ĚĤdÈF`¶@Ðë ¦ōÒ¨SêvHĢÛ@[ÆQoxHW[ŰîÀt¦Ǆ~NĠ¢lĄtZoCƞÔºCxrpČNpj¢{f_Y`_eq®Aot`@oDXfkp¨|s¬\\DÄSfè©Hn¬^DhÆyøJhØxĢĀLÊƠPżċĄwĮ¶"],
            "encodeOffsets": [[118923, 30536]]
        },
        "properties": {"cp": [115.892151, 28.676493], "name": "江西", "childNum": 1}
    }, {
        "id": "370000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@Xjd]mE", "@@itnq", "@@Dl@k", "@@TGw", "@@K¬U", "@@Wd`c", "@@PtMs", "@@LnXlc", "@@ppVu]Qn", "@@cdzAU_", "@@udRhnCE", "@@oIpP", "@@M{ĿčwbxƨîKÎMĮ]ZF½Y]â£ph¶¨râøÀÎǨ¤^ºÄGz~grĚĜlĞÆLĆǆ¢Îo¦cvKbgr°WhmZp L]LºcUÆ­nżĤÌĒbAnrOA´ȊcÀbƦUØrĆUÜøĬƞŶǬĴóò_A̈«ªdÎÉnb²ĦhņBĖįĦåXćì@L¯´ywƕCéÃµė ƿ¸lµZæyj|BíÂKNNnoƈfÈMZwnŐNàúÄsTJULîVjǎ¾ĒØDz²XPn±ŴPè¸ŔLƔÜƺ_TüÃĤBBċÈöA´faM¨{«M`¶d¡ôÖ°mȰBÔjj´PM|c^d¤u¤Û´ä«ƢfPk¶Môl]Lb}su^ke{lCMrDÇ­]NÑFsmoõľHyGă{{çrnÓEƕZGª¹Fj¢ÿ©}ÌCǷë¡ąuhÛ¡^KxC`C\\bÅxì²ĝÝ¿_NīCȽĿåB¥¢·IŖÕy\\¹kxÃ£ČáKµË¤ÁçFQ¡KtŵƋ]CgÏAùSedcÚźuYfyMmhUWpSyGwMPqŀÁ¼zK¶G­Y§Ë@´śÇµƕBm@IogZ¯uTMx}CVKï{éƵP_K«pÛÙqċtkkù]gTğwoɁsMõ³ăAN£MRkmEÊčÛbMjÝGuIZGPģãħE[iµBEuDPÔ~ª¼ęt]ûG§¡QMsğNPŏįzs£Ug{đJĿļā³]ç«Qr~¥CƎÑ^n¶ÆéÎR~Ż¸YI] PumŝrƿIā[xeÇ³L¯v¯s¬ÁY~}ťuŁgƋpÝĄ_ņī¶ÏSR´ÁP~¿Cyċßdwk´SsX|t`Ä ÈðAªìÎT°¦Dda^lĎDĶÚY°`ĪŴǒàŠv\\ebZHŖR¬ŢƱùęOÑM­³FÛaj"]],
            "encodeOffsets": [[[123806, 39303], [123821, 39266], [123742, 39256], [123702, 39203], [123649, 39066], [123847, 38933], [123580, 38839], [123894, 37288], [123043, 36624], [123344, 38676], [123522, 38857], [123628, 38858], [118267, 36772]]]
        },
        "properties": {"cp": [118.7402,
            36.4307], "name": "山东", "childNum": 13}
    }, {
        "id": "410000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@dXD}~Hgq~ÔN~zkĘHVsǲßjŬŢ`Pûàl¢\\ÀEhİgÞē X¼`khÍLùµP³swIÓzeŠĠð´E®ÚPtºIŊÊºL«šŕQGYfa[şußǑĩų_Z¯ĵÙčC]kbc¥CS¯ëÍB©ïÇÃ_{sWTt³xlàcČzÀD}ÂOQ³ÐTĬµƑÐ¿ŸghłŦv~}ÂZ«¤lPÇ£ªÝŴÅR§ØnhctâknÏ­ľŹUÓÝdKuķI§oTũÙďkęĆH¸Ó\\Ä¿PcnS{wBIvÉĽ[GqµuŇôYgûZca©@½Õǽys¯}lgg@­C\\£asIdÍuCQñ[L±ęk·ţb¨©kK»KC²òGKmĨS`UQnk}AGēsqaJ¥ĐGRĎpCuÌy ã iMcplk|tRkðev~^´¦ÜSí¿_iyjI|ȑ|¿_»d}q^{Ƈdă}tqµ`ŷé£©V¡om½ZÙÏÁRD|JOÈpÀRsI{ùÓjuµ{t}uËRivGçJFjµåkWê´MÂHewixGw½Yŷpµú³XU½ġyłåkÚwZX·l¢Á¢KzOÎÎjc¼htoDHr|­J½}JZ_¯iPq{tę½ĕ¦Zpĵø«kQĹ¤]MÛfaQpě±ǽ¾]u­Fu÷nčÄ¯ADp}AjmcEÇaª³o³ÆÍSƇĈÙDIzçñİ^KNiÞñ[aA²zzÌ÷D|[íÄ³gfÕÞd®|`Ć~oĠƑô³ŊD×°¯CsøÂ«ìUMhTº¨¸ǝêWÔDruÂÇZ£ĆPZW~ØØv¬gèÂÒw¦X¤Ā´oŬ¬²Ês~]®tªapŎJ¨Öº_ŔfŐ\\Đ\\Ĝu~m²Ƹ¸fWĦrƔ}Î^gjdfÔ¡J}\\n C¦þWxªJRÔŠu¬ĨĨmFdM{\\d\\YÊ¢ú@@¦ª²SÜsC}fNècbpRmlØ^gd¢aÒ¢CZZxvÆ¶N¿¢T@uC¬^ĊðÄn|lIlXhun[", "@@hzUq"]],
            "encodeOffsets": [[[116744, 37216], [116480, 33048]]]
        },
        "properties": {"cp": [ 113.4668,
            33.8818], "name": "河南", "childNum": 2}
    }, {
        "id": "420000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@ASd", "@@ls{d", "@@¾«}{ra®pîÃ\\{øCËyyB±b\\òÝjKL ]ĎĽÌJyÚCƈćÎT´Å´pb©ÈdFin~BCo°BĎÃømv®E^vǾ½Ĝ²RobÜeN^ĺ£R¬lĶ÷YoĖ¥Ě¾|sOr°jY`~I¾®I{GqpCgyl{£ÍÍyPLÂ¡¡¸kWxYlÙæŁĢz¾V´W¶ùŸo¾ZHxjwfxGNÁ³Xéæl¶EièIH ujÌQ~v|sv¶Ôi|ú¢FhQsğ¦SiŠBgÐE^ÁÐ{čnOÂÈUÎóĔÊēĲ}Z³½Mŧïeyp·uk³DsÑ¨L¶_ÅuÃ¨w»¡WqÜ]\\Ò§tƗcÕ¸ÕFÏǝĉăxŻČƟOKÉġÿ×wg÷IÅzCg]m«ªGeçÃTC«[t§{loWeC@ps_Bp­rf_``Z|ei¡oċMqow¹DƝÓDYpûsYkıǃ}s¥ç³[§cY§HK«Qy]¢wwö¸ïx¼ņ¾Xv®ÇÀµRĠÐHM±cÏdƒǍũȅȷ±DSyúĝ£ŤĀàtÖÿï[îb\\}pĭÉI±Ñy¿³x¯No|¹HÏÛmjúË~TuęjCöAwě¬Rđl¯ Ñb­ŇTĿ_[IčĄʿnM¦ğ\\É[T·k¹©oĕ@A¾wya¥Y\\¥Âaz¯ãÁ¡k¥ne£ÛwE©Êō¶˓uoj_U¡cF¹­[WvP©whuÕyBF`RqJUw\\i¡{jEPïÿ½fćQÑÀQ{°fLÔ~wXgītêÝ¾ĺHd³fJd]HJ²EoU¥HhwQsƐ»Xmg±çve]DmÍPoCc¾_hhøYrŊU¶eD°Č_N~øĹĚ·`z]Äþp¼äÌQv\\rCé¾TnkžŐÚÜa¼ÝƆĢ¶ÛodĔňÐ¢JqPb ¾|J¾fXƐîĨ_Z¯À}úƲN_ĒÄ^ĈaŐyp»CÇÄKñL³ġM²wrIÒŭxjb[n«øæà ^²­h¯ÚŐªÞ¸Y²ĒVø}Ā^İ´LÚm¥ÀJÞ{JVųÞŃx×sxxƈē ģMřÚðòIfĊŒ\\Ʈ±ŒdÊ§ĘDvČ_Àæ~Dċ´A®µ¨ØLV¦êHÒ¤"]],
            "encodeOffsets": [[[113712, 34000], [115612, 30507], [113649, 34054]]]
        },
        "properties": {"cp": [ 112.2363,
            31.1572], "name": "湖北", "childNum": 3}
    }, {
        "id": "430000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@nFZw", "@@ãÆá½ÔXrCOËRïÿĩ­TooQyÓ[ŅBE¬ÎÓXaį§Ã¸G °ITxpúxÚĳ¥ÏĢ¾edÄ©ĸGàGhM¤Â_U}Ċ}¢pczfþg¤ÇôAV", "@@ȴÚĖÁĐiOĜ«BxDõĚivSÌ}iùÜnÐºG{p°M°yÂÒzJ²Ì ÂcXëöüiáÿñőĞ¤ùTz²CȆȸǎŪƑÐc°dPÎğË¶[È½u¯½WM¡­ÉB·rínZÒ `¨GA¾\\pēXhÃRC­üWGġuTé§ŎÑ©êLM³}_EÇģc®ęisÁPDmÅ{b[RÅs·kPŽƥóRoOV~]{g\\êYƪ¦kÝbiċƵGZ»Ěõó·³vŝ£ø@pyö_ëIkÑµbcÑ§y×dYØªiþUjŅ³C}ÁN»hĻħƏâƓKA·³CQ±µ§¿AUƑ¹AtćOwD]JUÖgk¯b£ylZFËÑ±H­}EbóľA¡»Ku¦·³åş¥ùBD^{ÌC´­¦ŷJ£^[ª¿ğ|ƅN skóā¹¿ï]ă~÷O§­@Vm¡Qđ¦¢Ĥ{ºjÔª¥nf´~Õo×ÛąGû¥cÑ[Z¶ŨĪ²SÊǔƐƀAÚŌ¦QØ¼rŭ­«}NÏürÊ¬mjr@ĘrTW ­SsdHzƓ^ÇÂyUi¯DÅYlŹu{hT}mĉ¹¥ěDÿë©ıÓ[Oº£¥ótł¹MÕƪ`PDiÛU¾ÅâìUñBÈ£ýhedy¡oċ`pfmjP~kZaZsÐd°wj§@Ĵ®w~^kÀÅKvNmX\\¨aŃqvíó¿F¤¡@ũÑVw}S@j}¾«pĂrªg àÀ²NJ¶¶DôK|^ª°LX¾ŴäPĪ±£EXd^¶ĲÞÜ~u¸ǔMRhsRe`ÄofIÔ\\Ø  ićymnú¨cj ¢»GČìƊÿÐ¨XeĈĀ¾Oð Fi ¢|[jVxrIQ_EzAN¦zLU`cªxOTu RLÄªpUĪȴ^ŎµªÉFxÜf¤ºgĲèy°Áb[¦Zb¦z½xBĖ@ªpºjS´rVźOd©ʪiĎăJP`"]],
            "encodeOffsets": [[[115640, 30489], [112577, 27316], [114113, 30649]]]
        },
        "properties": {"cp": [ 111.5332,
            27.3779], "name": "湖南", "childNum": 3}
    }, {
        "id": "440000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@QdAsa", "@@lxDRm", "@@sbhNLo", "@@Ă ý", "@@WltOY[", "@@Kr]S", "@@e~AS}", "@@I|Mym", "@@Û³LS²Q", "@@nvºBë¥cÕº", "@@zdÛJm", "@@°³", "@@a yAª¸ËJIxØ@ĀHÉÕZofoo", "@@sŗÃÔėAƁZÄ ~°ČPºb", "@@¶ÝÌvmĞh¹Ĺ", "@@HdSjĒ¢D}waru«ZqadY{K", "@@el\\LqqO", "@@~rMmX", "@@f^E", "@@øPªoj÷ÍÝħXČx°Q¨ıXJp", "@@gÇƳmxatfu", "@@EÆC½", "@@¸B_¶ekWvSivc}p}Ăº¾NĎyj¦Èm th_®Ä}»âUzLË²Aā¡ßH©Ùñ}wkNÕ¹ÇO½¿£ēUlaUìIÇª`uTÅxYĒÖ¼kÖµMjJÚwn\\hĒv]îh|ÈƄøèg¸Ķß ĉĈWb¹ƀdéĘNTtP[öSvrCZaGubo´ŖÒÇĐ~¡zCIözx¢PnÈñ @ĥÒ¦]ƜX³ăĔñiiÄÓVépKG½ÄÓávYoC·sitiaÀyŧÎ¡ÈYDÑům}ý|m[węõĉZÅxUO}÷N¹³ĉo_qtăqwµŁYÙǝŕ¹tïÛUÃ¯mRCºĭ|µÕÊK½Rē ó]GªęAxNqSF|ām¡diď×YïYWªŉOeÚtĐ«zđ¹TāúEáÎÁWwíHcòßÎſ¿Çdğ·ùT×Çūʄ¡XgWÀǇğ·¿ÃOj YÇ÷Sğ³kzőõmĝ[³¡VÙæÅöMÌ³¹pÁaËýý©D©ÜJŹƕģGą¤{ÙūÇO²«BƱéAÒĥ¡«BhlmtÃPµyU¯ucd·w_bŝcīímGOGBȅŹãĻFŷŽŕ@Óoo¿ē±ß}}ÓF÷tĲWÈCőâUâǙIğŉ©IĳE×Á³AĥDĈ±ÌÜÓĨ£L]ĈÙƺZǾĆĖMĸĤfÎĵlŨnÈĐtFFĤêk¶^k°f¶g}®Faf`vXŲxl¦ÔÁ²¬Ð¦pqÊÌ²iXØRDÎ}Ä@ZĠsx®AR~®ETtĄZƈfŠŠHâÒÐAµ\\S¸^wĖkRzalŜ|E¨ÈNĀňZTpBh£\\ĎƀuXĖtKL¶G|»ĺEļĞ~ÜĢÛĊrOÙîvd]n¬VÊĜ°RÖpMƀ¬HbwEÀ©\\¤]ŸI®¥D³|Ë]CúAŠ¦æ´¥¸Lv¼¢ĽBaôF~®²GÌÒEYzk¤°ahlVÕI^CxĈPsBƒºVÀB¶¨R²´D", "@@OR"]],
            "encodeOffsets": [[[117381, 22988], [116552, 22934], [116790, 22617], [116973, 22545], [116444, 22536], [116931, 22515], [116496, 22490], [116453, 22449], [113301, 21439], [118726, 21604], [118709, 21486], [113210, 20816], [115482, 22082], [113171, 21585], [113199, 21590], [115232, 22102], [115739, 22373], [115134, 22184], [113056, 21175], [119573, 21271], [119957, 24020], [115859, 22356], [116680, 26053], [116561, 22649]]]
        },
        "properties": {"cp": [ 113.4668,
            22.8076], "name": "广东", "childNum": 24}
    }, {
        "id": "450000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@H TI¡U", "@@Ɣ_LÊFZgčP­kini«qÇczÍY®¬Ů»qR×ō©DÕ§ƙǃŵTÉĩ±ıdÑnYYĲvNĆĆØÜ Öp}e³¦m©iÓ|¹ħņ|ª¦QF¢Â¬ʖovg¿em^ucäāmÇÖåB¡Õçĝ}FĻ¼Ĺ{µHKsLSđƃrč¤[AgoSŇYMÿ§Ç{FśbkylQxĕ]T·¶[BÑÏGáşşƇeăYSs­FQ}­BwtYğÃ@~CÍQ ×WjË±rÉ¥oÏ ±«ÓÂ¥kwWűue_b­E~µh¯ecl¯Ïr¯EģJğ}w³Ƈē`ãògK_ÛsUʝćğ¶höO¤Ǜn³c`¡yię[ďĵűMę§]XÎ_íÛ]éÛUćİÕBƣ±dy¹T^dûÅÑŦ·PĻþÙ`K¦¢ÍeĥR¿³£[~äu¼dltW¸oRM¢ď\\z}Æzdvň{ÎXF¶°Â_ÒÂÏL©ÖTmu¼ãlīkiqéfA·Êµ\\őDc¥ÝFyÔćcűH_hLÜêĺĐ¨c}rn`½Ì@¸¶ªVLhŒ\\Ţĺk~Ġið°|gtTĭĸ^xvKVGréAébUuMJVÃO¡qĂXËSģãlýà_juYÛÒBG^éÖ¶§EGÅzěƯ¤EkN[kdåucé¬dnYpAyČ{`]þ±X\\ÞÈk¡ĬjàhÂƄ¢Hè ŔâªLĒ^Öm¶ħĊAǦė¸zÚGn£¾rªŀÜt¬@ÖÚSx~øOŒŶÐÂæȠ\\ÈÜObĖw^oÞLf¬°bI lTØBÌF£Ć¹gñĤaYt¿¤VSñK¸¤nM¼JE±½¸ñoÜCƆæĪ^ĚQÖ¦^f´QüÜÊz¯lzUĺš@ìp¶n]sxtx¶@~ÒĂJb©gk{°~c°`Ô¬rV\\la¼¤ôá`¯¹LCÆbxEræOv[H­[~|aB£ÖsºdAĐzNÂðsÞÆĤªbab`ho¡³F«èVZs\\\\ÔRzpp®SĪº¨ÖºNĳd`a¦¤F³¢@`¢ĨĀìhYvlĆº¦Ċ~nS|gźv^kGÆÀè·"]],
            "encodeOffsets": [[[111707, 21520], [113706, 26955]]]
        },
        "properties": {"cp": [ 108.2813,
            23.6426], "name": "广西", "childNum": 2}
    }, {
        "id": "460000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@¦Ŝil¢XƦƞòïè§ŞCêɕrŧůÇąĻõ·ĉ³œ̅kÇm@ċȧŧĥĽʉ­ƅſȓÒË¦ŝE}ºƑ[ÍĜȋ gÎfǐÏĤ¨êƺ\\Ɔ¸ĠĎvʄȀÐ¾jNðĀÒRZǆzÐĊ¢DÀɘZ"],
            "encodeOffsets": [[112750, 20508]]
        },
        "properties": {"cp": [ 109.9512,
            19.2041], "name": "海南", "childNum": 1}
    }, {
        "id": "510000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@LqSn", "@@ĆOìÛÐ@ĞǔNY{¤Á§di´ezÝúØãwIþËQÇ¦ÃqÉSJ»ĂéʔõÔƁİlƞ¹§ĬqtÀƄmÀêErĒtD®ċæcQE®³^ĭ¥©l}äQtoŖÜqÆkµªÔĻĴ¡@Ċ°B²Èw^^RsºTĀ£ŚæQPJvÄz^Đ¹Æ¯fLà´GC²dt­ĀRt¼¤ĦOðğfÔðDŨŁĞƘïPÈ®âbMüÀXZ ¸£@Å»»QÉ­]dsÖ×_Í_ÌêŮPrĔĐÕGĂeZÜîĘqBhtO ¤tE[h|YÔZśÎs´xº±Uñt|OĩĠºNbgþJy^dÂY Į]Řz¦gC³R`Āz¢Aj¸CL¤RÆ»@­Ŏk\\Ç´£YW}z@Z}Ã¶oû¶]´^NÒ}èNªPÍy¹`S°´ATeVamdUĐwʄvĮÕ\\uÆŗ¨Yp¹àZÂmWh{á}WØǍÉüwga§ßAYrÅÂQĀÕ¬LŐý®Xøxª½Ű¦¦[þ`ÜUÖ´òrÙŠ°²ÄkĳnDX{U~ET{ļº¦PZcjF²Ė@pg¨B{u¨ŦyhoÚD®¯¢ WòàFÎ¤¨GDäz¦kŮPġqË¥À]eâÚ´ªKxīPÖ|æ[xÃ¤JÞĥsNÖ½I¬nĨY´®ÐƐmDŝuäđđEbee_v¡}ìęǊē}qÉåT¯µRs¡M@}ůaa­¯wvƉåZw\\Z{åû`[±oiJDÅ¦]ĕãïrG réÏ·~ąSfy×Í·ºſƽĵȁŗūmHQ¡Y¡®ÁÃ×t«­T¤JJJyJÈ`Ohß¦¡uËhIyCjmÿwZGTiSsOB²fNmsPa{M{õE^Hj}gYpaeu¯oáwHjÁ½M¡pMuåmni{fk\\oÎqCwEZ¼KĝAy{m÷LwO×SimRI¯rKõBS«sFe]fµ¢óY_ÆPRcue°Cbo×bd£ŌIHgtrnyPt¦foaXďxlBowz_{ÊéWiêEGhÜ¸ºuFĈIxf®Y½ĀǙ]¤EyF²ċw¸¿@g¢§RGv»áW`ÃĵJwi]t¥wO­½a[×]`Ãi­üL¦LabbTÀåc}ÍhÆh®BHî|îºÉk­¤Sy£ia©taį·Ɖ`ō¥UhOĝLk}©Fos´JmµlŁuønÑJWÎªYÀïAetTŅÓGË«bo{ıwodƟ½OġÜÂµxàNÖ¾P²§HKv¾]|BÆåoZ`¡Ø`ÀmºĠ~ÌÐ§nÇ¿¤]wğ@srğu~Io[é±¹ ¿ſđÓ@qg¹zƱřaí°KtÇ¤V»Ã[ĩǭƑ^ÇÓ@áťsZÏÅĭƋěpwDóÖáŻneQËq·GCœýS]x·ýq³OÕ¶Qzßti{řáÍÇWŝŭñzÇWpç¿JXĩè½cFÂLiVjx}\\NŇĖ¥GeJA¼ÄHfÈu~¸Æ«dE³ÉMA|bÒćhG¬CMõƤąAvüVéŀ_VÌ³ĐwQj´·ZeÈÁ¨X´Æ¡Qu·»ÕZ³ġqDoy`L¬gdp°şp¦ėìÅĮZ°Iähzĵf²å ĚÑKpIN|Ñz]ń·FU×é»R³MÉ»GM«kiér}Ã`¹ăÞmÈnÁîRǀ³ĜoİzŔwǶVÚ£À]ɜ»ĆlƂ²ĠþTº·àUȞÏʦ¶I«dĽĢdĬ¿»Ĕ×h\\c¬ä²GêëĤł¥ÀǿżÃÆMº}BÕĢyFVvwxBèĻĒ©Ĉt@Ğû¸£B¯¨ˋäßkķ½ªôNÔ~t¼Ŵu^s¼{TA¼ø°¢İªDè¾Ň¶ÝJ®Z´ğ~Sn|ªWÚ©òzPOȸbð¢|øĞA"]],
            "encodeOffsets": [[[108815, 30935], [100197, 35028]]]
        },
        "properties": {"cp": [ 102.9199,
            30.1904], "name": "四川", "childNum": 2}
    }, {
        "id": "520000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@G\\lY£cj", "@@q|mc¯vÏV", "@@hÑ£IsNgßHHªķÃh_¹¡ĝÄ§ń¦uÙùgS¯JH|sÝÅtÁïyMDč»eÕtA¤{b\\}G®u\\åPFqwÅaDK°ºâ_£ùbµmÁÛĹM[q|hlaªāI}Ñµ@swtwm^oµDéĽŠyVky°ÉûÛR³e¥]RÕěħ[ƅåÛDpJiVÂF²I»mN·£LbÒYbWsÀbpkiTZĄă¶Hq`ĥ_J¯ae«KpÝx]aĕÛPÇȟ[ÁåŵÏő÷Pw}TÙ@Õs«ĿÛq©½m¤ÙH·yǥĘĉBµĨÕnđ]K©œáGçş§ÕßgǗĦTèƤƺ{¶ÉHÎd¾ŚÊ·OÐjXWrãLyzÉAL¾ę¢bĶėy_qMĔąro¼hĊw¶øV¤w²Ĉ]ÊKx|`ź¦ÂÈdrcÈbe¸`I¼čTF´¼Óýȃr¹ÍJ©k_șl³´_pĐ`oÒh¶pa^ÓĔ}D»^Xy`d[KvJPhèhCrĂĚÂ^Êƌ wZL­Ġ£ÁbrzOIlMMĪŐžËr×ÎeŦtw|¢mKjSǘňĂStÎŦEtqFT¾Eì¬¬ôxÌO¢ K³ŀºäYPVgŎ¦ŊmŞ¼VZwVlz¤£Tl®ctĽÚó{G­AÇge~Îd¿æaSba¥KKûj®_Ä^\\Ø¾bP®¦x^sxjĶI_Ä Xâ¼Hu¨Qh¡À@Ëô}±GNìĎlT¸`V~R°tbÕĊ`¸úÛtÏFDu[MfqGH·¥yAztMFe|R_GkChZeÚ°tov`xbDnÐ{E}ZèxNEÞREn[Pv@{~rĆAB§EO¿|UZ~ìUf¨J²ĂÝÆsªB`s¶fvö¦Õ~dÔq¨¸º»uù[[§´sb¤¢zþF¢ÆÀhÂW\\ıËIÝo±ĭŠ£þÊs}¡R]ěDg´VG¢j±®èºÃmpU[Áëº°rÜbNu¸}º¼`niºÔXĄ¤¼ÔdaµÁ_ÃftQQgR·Ǔv}Ý×ĵ]µWc¤F²OĩųãW½¯K©]{LóµCIµ±Mß¿h©āq¬o½~@i~TUxð´Đhw­ÀEîôuĶb[§nWuMÆJl½]vuıµb"]],
            "encodeOffsets": [[[112158, 27383], [112105, 27474], [112095, 27476]]]
        },
        "properties": {"cp": [106.6113,
            26.9385], "name": "贵州", "childNum": 3}
    }, {
        "id": "530000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@[ùx½}ÑRHYīĺûsÍniEoã½Ya²ė{c¬ĝgĂsAØÅwďõzFjw}«Dx¿}Uũlê@HÅ­F¨ÇoJ´Ónũuą¡Ã¢pÒÅØ TF²xa²ËXcÊlHîAßËŁkŻƑŷÉ©hW­æßUËs¡¦}teèÆ¶StÇÇ}Fd£jĈZĆÆ¤Tč\\D}O÷£U§~ŃGåŃDĝ¸Tsd¶¶Bª¤u¢ŌĎo~t¾ÍŶÒtD¦ÚiôözØX²ghįh½Û±¯ÿm·zR¦Ɵ`ªŊÃh¢rOÔ´£Ym¼èêf¯ŪĽncÚbw\\zlvWªâ ¦gmĿBĹ£¢ƹřbĥkǫßeeZkÙIKueT»sVesbaĕ  ¶®dNĄÄpªy¼³BE®lGŭCǶwêżĔÂepÍÀQƞpC¼ŲÈ­AÎô¶RäQ^Øu¬°_Èôc´¹ò¨PÎ¢hlĎ¦´ĦÆ´sâÇŲPnÊD^¯°Upv}®BPÌªjǬxSöwlfòªvqĸ|`H­viļndĜ­Ćhňem·FyÞqóSį¯³X_ĞçêtryvL¤§z¦c¦¥jnŞklD¤øz½ĜàĂŧMÅ|áƆàÊcðÂFÜáŢ¥\\\\ºİøÒÐJĴîD¦zK²ǏÎEh~CD­hMn^ÌöÄ©ČZÀaüfɭyœpį´ěFűk]Ôě¢qlÅĆÙa¶~ÄqêljN¬¼HÊNQ´ê¼VØ¸E^ŃÒyM{JLoÒęæe±Ķygã¯JYÆĭĘëo¥Šo¯hcK«z_prC´ĢÖY¼ v¸¢RÅW³Â§fÇ¸Yi³xR´ďUË`êĿUûuĆBƣöNDH«ĈgÑaB{ÊNF´¬c·Åv}eÇÃGB»If¦HňĕM~[iwjUÁKE¾dĪçWIèÀoÈXòyŞŮÈXâÎŚj|àsRyµÖPr´þ ¸^wþTDŔHr¸RÌmfżÕâCôoxĜƌÆĮÐYtâŦÔ@]ÈǮƒ\\Ī¼Ä£UsÈ¯LbîƲŚºyhr@ĒÔƀÀ²º\\êpJ}ĠvqtĠ@^xÀ£È¨mËÏğ}n¹_¿¢×Y_æpÅA^{½Lu¨GO±Õ½ßM¶wÁĢÛPƢ¼pcĲx|apÌ¬HÐŊSfsðBZ¿©XÏÒKk÷Eû¿SrEFsÕūkóVǥŉiTL¡n{uxţÏhôŝ¬ğōNNJkyPaqÂğ¤K®YxÉƋÁ]āęDqçgOgILu\\_gz]W¼~CÔē]bµogpÑ_oď`´³Țkl`IªºÎȄqÔþ»E³ĎSJ»_f·adÇqÇc¥Á_Źw{L^É±ćxU£µ÷xgĉp»ĆqNē`rĘzaĵĚ¡K½ÊBzyäKXqiWPÏÉ¸½řÍcÊG|µƕƣGË÷k°_^ý|_zċBZocmø¯hhcæ\\lMFlư£ĜÆyHF¨µêÕ]HAàÓ^it `þßäkĤÎT~Wlÿ¨ÔPzUCNVv [jâôDôď[}z¿msSh¯{jïğl}šĹ[őgK©U·µË@¾m_~q¡f¹ÅË^»f³ø}Q¡ÖË³gÍ±^Ç\\ëÃA_¿bWÏ[¶ƛé£F{īZgm@|kHǭƁć¦UĔť×ëǟeċ¼ȡȘÏíBÉ£āĘPªĳ¶ŉÿy©nď£G¹¡I±LÉĺÑdĉÜW¥}gÁ{aqÃ¥aıęÏZÁ`"],
            "encodeOffsets": [[104636, 22969]]
        },
        "properties": {"cp": [  101.8652,
            24.1807], "name": "云南", "childNum": 1}
    }, {
        "id": "540000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@ÂhľxŖxÒVºÅâAĪÝȆµę¯Ňa±r_w~uSÕňqOj]ɄQ£ZUDûoY»©M[L¼qãË{VÍçWVi]ë©Ä÷àyƛhÚU°adcQ~Mx¥caÛcSyFÖk­uRýq¿ÔµQĽ³aG{¿FµëªéĜÿª@¬·K·àariĕĀ«V»ŶĴūgèLǴŇƶaftèBŚ£^âǐÝ®M¦ÁǞÿ¬LhJ¾óƾÆºcxwf]Y´¦|QLn°adĊ\\¨oǀÍŎ´ĩĀd`tÊQŞŕ|¨C^©Ĉ¦¦ÎJĊ{ëĎjª²rÐl`¼Ą[t|¦Stè¾PÜK¸dƄı]s¤î_v¹ÎVòŦj£Əsc¬_Ğ´|Ł¦Av¦w`ăaÝaa­¢e¤ı²©ªSªÈMĄwÉØŔì@T¤Ę\\õª@þo´­xA sÂtŎKzó²ÇČµ¢r^nĊ­Æ¬×üG¢³ {âĊ]G~bÀgVjzlhǶfOfdªB]pjTOtĊn¤}®¦Č¥d¢¼»ddY¼t¢eȤJ¤}Ǿ¡°§¤AÐlc@ĝsªćļđAçwxUuzEÖġ~AN¹ÄÅȀŻ¦¿ģŁéì±Hãd«g[Ø¼ēÀcīľġ¬cJµÐʥVȝ¸ßS¹ý±ğkƁ¼ą^ɛ¤Ûÿb[}¬ōõÃ]ËNm®g@Bg}ÍF±ǐyL¥íCIĳÏ÷Ñį[¹¦[âšEÛïÁÉdƅß{âNÆāŨß¾ě÷yC£k­´ÓH@Â¹TZ¥¢į·ÌAÐ§®Zcv½Z­¹|ÅWZqgW|ieZÅYVÓqdqbc²R@c¥Rã»GeeƃīQ}J[ÒK¬Ə|oėjġĠÑN¡ð¯EBčnwôɍėª²CλŹġǝʅįĭạ̃ūȹ]ΓͧgšsgȽóϧµǛęgſ¶ҍć`ĘąŌJÞä¤rÅň¥ÖÁUětęuůÞiĊÄÀ\\Æs¦ÓRb|Â^řÌkÄŷ¶½÷f±iMÝ@ĥ°G¬ÃM¥n£Øąğ¯ß§aëbéüÑOčk£{\\eµª×MÉfm«Ƒ{Å×Gŏǩãy³©WÑăû··Qòı}¯ãIéÕÂZ¨īès¶ZÈsæĔTŘvgÌsN@îá¾ó@ÙwU±ÉTå»£TđWxq¹Zobs[×¯cĩvėŧ³BM|¹kªħ¥TzNYnÝßpęrñĠĉRS~½ěVVµõ«M££µBĉ¥áºae~³AuĐh`Ü³ç@BÛïĿa©|z²Ý¼D£àč²ŸIûI āóK¥}rÝ_Á´éMaň¨~ªSĈ½½KÙóĿeƃÆB·¬ën×W|Uº}LJrƳlŒµ`bÔ`QÐÓ@s¬ñIÍ@ûws¡åQÑßÁ`ŋĴ{ĪTÚÅTSÄ³Yo|Ç[Ç¾µMW¢ĭiÕØ¿@MhpÕ]jéò¿OƇĆƇpêĉâlØwěsǩĵ¸cbU¹ř¨WavquSMzeo_^gsÏ·¥Ó@~¯¿RiīB\\qTGªÇĜçPoÿfñòą¦óQīÈáPābß{ZŗĸIæÅhnszÁCËìñÏ·ąĚÝUm®ó­L·ăUÈíoù´Êj°ŁŤ_uµ^°ìÇ@tĶĒ¡ÆM³Ģ«İĨÅ®ğRāðggheÆ¢zÊ©Ô\\°ÝĎz~ź¤PnMĪÖB£kné§żćĆKĒ°¼L¶èâz¨u¦¥LDĘz¬ýÎmĘd¾ßFzhg²Fy¦ĝ¤ċņbÎ@yĄæm°NĮZRÖíJ²öLĸÒ¨Y®ƌÐVàtt_ÚÂyĠz]ŢhzĎ{ÂĢXc|ÐqfO¢¤ögÌHNPKŖUú´xx[xvĐCûĀìÖT¬¸^}Ìsòd´_KgžLĴÀBon|H@Êx¦BpŰŌ¿fµƌA¾zǈRx¶FkĄźRzŀ~¶[´HnªVƞuĒ­È¨ƎcƽÌm¸ÁÈM¦x͊ëÀxǆBú^´W£dkɾĬpw˂ØɦļĬIŚÊnŔa¸~J°îlɌxĤÊÈðhÌ®gT´øàCÀ^ªerrƘd¢İP|Ė ŸWªĦ^¶´ÂLaT±üWƜǀRÂŶUńĖ[QhlLüAÜ\\qRĄ©"],
            "encodeOffsets": [[90849, 37210]]
        },
        "properties": {"cp": [ 83.7695,
            31.6846], "name": "西藏", "childNum": 1}
    }, {
        "id": "610000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@¸ÂW¢xR­Fq§uF@N¢XLRMº[ğȣſï|¥Jkc`sŉǷ£Y³WN«ùMëï³ÛIg÷±mTșÚÒķø©þ¥yÓğęmWµÎumZyOŅƟĥÓ~sÑL¤µaÅY¦ocyZ{y c]{Ta©`U_Ěē£ωÊƍKùK¶ȱÝƷ§{û»ÅÁȹÍéuĳ|¹cÑdìUYOuFÕÈYvÁCqÓTǢí§·S¹NgV¬ë÷Át°DØ¯C´ŉƒópģ}ąiEËFéGU¥×K§­¶³BČ}C¿åċ`wġB·¤őcƭ²ő[Å^axwQOñJÙïŚĤNĔwƇÄńwĪ­o[_KÓª³ÙnKÇěÿ]ďă_d©·©Ýŏ°Ù®g]±ß×¥¬÷m\\iaǑkěX{¢|ZKlçhLtŇîŵœè[É@ƉĄEtƇÏ³­ħZ«mJ×¾MtÝĦ£IwÄå\\Õ{OwĬ©LÙ³ÙTª¿^¦rÌĢŭO¥lãyC§HÍ£ßEñX¡­°ÙCgpťzb`wIvA|¥hoĕ@E±iYd¥OÿµÇvPW|mCĴŜǂÒW¶¸AĜh^Wx{@¬­F¸¡ķn£P|ªĴ@^ĠĈæbÔc¶lYi^MicĎ°Â[ävï¶gv@ÀĬ·lJ¸sn|¼u~a]ÆÈtŌºJpþ£KKf~¦UbyäIĺãnÔ¿^­ŵMThĠÜ¤ko¼Ŏìąǜh`[tRd²Ĳ_XPrɲlXiL§à¹H°Ȧqº®QCbAŌJ¸ĕÚ³ĺ§ `d¨YjiZvRĺ±öVKkjGȊÄePĞZmļKÀ[`ösìhïÎoĬdtKÞ{¬èÒÒBÔpĲÇĬJŊ¦±J«[©ārHµàåVKe§|P²ÇÓ·vUzgnN¾yI@oHĆÛķhxen¡QQ±ƝJǖRbzy¸ËÐl¼EºpĤ¼x¼½~Ğà@ÚüdK^mÌSjp²ȮµûGĦ}Ħðǚ¶òƄjɂz°{ºØkÈęâ¦jªBg\\ċ°s¬]jú EȌǆ¬stRÆdĠİwÜ¸ôW¾ƮłÒ_{Ìû¼jº¹¢GǪÒ¯ĘZ`ºŊecņą~BÂgzpâēòYƲȐĎ"],
            "encodeOffsets": [[113634, 40474]]
        },
        "properties": {"cp": [ 109.0996,
            34.6396], "name": "陕西", "childNum": 1}
    }, {
        "id": "620000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@Vu_^", "@@ųEĠtt~nkh`Q¦ÅÄÜdwAb×ĠąJ¤DüègĺqBqj°lI¡Ĩ¶ĖIHdjÎB°aZ¢KJO[|A£Dx}NĂ¬HUnrk kp¼Y kMJn[aGáÚÏ[½rc}aQxOgsPMnUsncZsKúvAtÞġ£®ĀYKdnFw¢JE°Latf`¼h¬we|Æbj}GA·~W`¢MC¤tL©Ĳ°qdfObÞĬ¹ttu`^ZúE`[@Æsîz®¡CƳƜG²R¢RmfwĸgÜą G@pzJM½mhVy¸uÈÔO±¨{LfæU¶ßGĂq\\ª¬²I¥IŉÈīoıÓÑAçÑ|«LÝcspīðÍgtë_õ\\ĉñLYnĝgRǡÁiHLlõUĹ²uQjYi§Z_c¨´ĹĖÙ·ŋIaBD­R¹ȥr¯GºßK¨jWkɱOqWĳ\\a­Q\\sg_ĆǛōëp»£lğÛgSŶN®À]ÓämĹãJaz¥V}Le¤Lýo¹IsŋÅÇ^bz³tmEÁ´a¹cčecÇNĊãÁ\\č¯dNj]jZµkÓdaćå]ğĳ@ ©O{¤ĸm¢E·®«|@Xwg]Aģ±¯XǁÑǳªcwQÚŝñsÕ³ÛV_ý¥\\ů¥©¾÷w©WÕÊĩhÿÖÁRo¸V¬âDb¨hûxÊ×ǌ~Zâg|XÁnßYoº§ZÅŘv[ĭÖʃuďxcVbnUSfB¯³_TzºÎO©çMÑ~M³]µ^püµÄY~y@X~¤Z³[Èōl@®Å¼£QK·Di¡ByÿQ_´D¥hŗy^ĭÁZ]cIzýah¹MĪğPs{ò²Vw¹t³ŜË[Ñ}X\\gsF£sPAgěp×ëfYHāďÖqēŭOÏëdLü\\it^c®RÊº¶¢H°mrY£B¹čIoľu¶uI]vģSQ{UŻÅ}QÂ|Ì°ƅ¤ĩŪU ęĄÌZÒ\\v²PĔ»ƢNHĂyAmƂwVm`]ÈbH`Ì¢²ILvĜH®¤Dlt_¢JJÄämèÔDëþgºƫaʎÌrêYi~ Îİ¤NpÀA¾Ĕ¼bð÷®üszMzÖĖQdȨýv§Tè|ªHÃ¾a¸|Ð ƒwKĢx¦ivr^ÿ ¸l öæfƟĴ·PJv}n\\h¹¶v·À|\\ƁĚN´ĜçèÁz]ġ¤²¨QÒŨTIlªťØ}¼˗ƦvÄùØEÂ«FïËIqōTvāÜŏíÛßÛVj³âwGăÂíNOPìyV³ŉĖýZso§HÑiYw[ß\\X¦¥c]ÔƩÜ·«jÐqvÁ¦m^ċ±R¦΋ƈťĚgÀ»IïĨʗƮ°ƝĻþÍAƉſ±tÍEÕÞāNUÍ¡\\ſčåÒʻĘm ƭÌŹöʥëQ¤µ­ÇcƕªoIýIÉ_mkl³ăƓ¦j¡YzŇi}Msßõīʋ }ÁVm_[n}eı­Uĥ¼ªI{Î§DÓƻėojqYhĹT©oūĶ£]ďxĩǑMĝq`B´ƃ˺Чç~²ņj@¥@đ´ί}ĥtPńÇ¾V¬ufÓÉCtÓ̻¹£G³]ƖƾŎĪŪĘ̖¨ʈĢƂlɘ۪üºňUðǜȢƢż̌ȦǼĤŊɲĖÂ­KqĘŉ¼ĔǲņɾªǀÞĈĂD½ĄĎÌŗĞrôñnN¼â¾ʄľԆ|Ǆ֦ज़ȗǉ̘̭ɺƅêgV̍ʆĠ·ÌĊv|ýĖÕWĊǎÞ´õ¼cÒÒBĢ͢UĜð͒s¨ňƃLĉÕÝ@ɛƯ÷¿Ľ­ĹeȏĳëCȚDŲyê×Ŗyò¯ļcÂßYtÁƤyAã˾J@ǝrý@¤rz¸oP¹ɐÚyáHĀ[JwcVeȴÏ»ÈĖ}ƒŰŐèȭǢόĀƪÈŶë;Ñ̆ȤМľĮEŔĹŊũ~ËUă{ĻƹɁύȩþĽvĽƓÉ@ēĽɲßǐƫʾǗĒpäWÐxnsÀ^ƆwW©¦cÅ¡Ji§vúF¶¨c~c¼īeXǚ\\đ¾JwÀďksãAfÕ¦L}waoZD½Ml«]eÒÅaÉ²áo½FõÛ]ĻÒ¡wYR£¢rvÓ®y®LFLzĈôe]gx}|KK}xklL]c¦£fRtív¦PŨ£", "@@M T¥"]],
            "encodeOffsets": [[[108619, 36299], [108594, 36341], [108600, 36306]]]
        },
        "properties": {"cp": [ 95.7129,
            40.166], "name": "甘肃", "childNum": 3}
    }, {
        "id": "630000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@InJo", "@@CÆ½OŃĦsΰ~Ē³¦@@Ņi±è}ШƄ˹A³r_ĞǒNĪĐw¤^ŬĵªpĺSZgrpiƼĘÔ¨C|ÍJ©Ħ»®VĲ~f\\m `UnÂ~ʌĬàöNt~ňjy¢ZiƔ¥Ąk´nl`JÊJþ©pdƖ®È£¶ìRʦźõƮËnʼėæÑƀĎ[¢VÎĂMÖÝÎF²sƊƀÎBļýƞ¯ʘƭðħ¼Jh¿ŦęΌƇ¥²Q]Č¥nuÂÏri¸¬ƪÛ^Ó¦d¥[Wàx\\ZjÒ¨GtpþYŊĕ´zUOëPîMĄÁxH´áiÜUàîÜŐĂÛSuŎrJðÌ¬EFÁú×uÃÎkrĒ{V}İ«O_ÌËĬ©ÓŧSRÑ±§Ģ£^ÂyèçěM³Ƃę{[¸¿uºµ[gt£¸OƤĿéYõ·kĀq]juw¥DĩƍõÇPéÄ½G©ã¤GuȧþRcÕĕNyyût­øï»a½ē¿BMoį£Íj}éZËqbʍƬh¹ìÿÓAçãnIÃ¡I`ks£CG­ěUy×Cy@¶ʡÊBnāzGơMē¼±O÷õJËĚăVĪũƆ£¯{ËL½ÌzżVR|ĠTbuvJvµhĻĖHAëáa­OÇðñęNwœľ·LmI±íĠĩPÉ×®ÿscB³±JKßĊ«`ađ»·QAmOVţéÿ¤¹SQt]]Çx±¯A@ĉĳ¢Óļ©l¶ÅÛrŕspãRk~¦ª]Į­´FRåd­ČsCqđéFn¿ÅƃmÉx{W©ºƝºįkÕƂƑ¸wWūÐ©ÈF£\\tÈ¥ÄRÈýÌJ lGr^×äùyÞ³fjc¨£ÂZ|ǓMĝÏ@ëÜőRĝ÷¡{aïȷPu°ËXÙ{©TmĠ}Y³­ÞIňµç½©C¡į÷¯B»|St»]vųs»}MÓ ÿʪƟǭA¡fs»PY¼c¡»¦cċ­¥£~msĉPSi^o©AecPeǵkgyUi¿h}aHĉ^|á´¡HØûÅ«ĉ®]m¡qċ¶±ÈyôōLÁstB®wn±ă¥HSòė£Së@×œÊăxÇN©©T±ª£Ĳ¡fb®Þbb_Ą¥xu¥B{łĝ³«`dƐt¤ťiñÍUuºí`£^tƃĲc·ÛLO½sç¥Ts{ă\\_»kÏ±q©čiìĉ|ÍI¥ć¥]ª§D{ŝŖÉR_sÿc³ĪōƿÎ§p[ĉc¯bKmR¥{³Ze^wx¹dƽÅ½ôIg §Mĕ ƹĴ¿ǣÜÍ]Ý]snåA{eƭ`ǻŊĿ\\ĳŬűYÂÿ¬jĖqßb¸L«¸©@ěĀ©ê¶ìÀEH|´bRľÓ¶rÀQþvl®ÕETzÜdb hw¤{LRdcb¯ÙVgƜßzÃôì®^jUèXÎ|UäÌ»rK\\ªN¼pZCüVY¤ɃRi^rPŇTÖ}|br°qňbĚ°ªiƶGQ¾²x¦PmlŜ[Ĥ¡ΞsĦÔÏâ\\ªÚŒU\\f¢N²§x|¤§xĔsZPòʛ²SÐqF`ªVÞŜĶƨVZÌL`¢dŐIqr\\oäõFÎ·¤»Ŷ×h¹]ClÙ\\¦ďÌį¬řtTӺƙgQÇÓHţĒ´ÃbEÄlbʔC|CŮkƮ[ʼ¬ň´KŮÈΰÌĪ¶ƶlðļATUvdTGº̼ÔsÊDÔveMg"]],
            "encodeOffsets": [[[105308, 37219], [95370, 40081]]]
        },
        "properties": {"cp": [  96.2402,
            35.4199], "name": "青海", "childNum": 2}
    }, {
        "id": "640000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@KëÀęĞ«Oęȿȕı]ŉ¡åįÕÔ«ǴõƪĚQÐZhv K°öqÀÑS[ÃÖHƖčËnL]ûcÙß@ĝ¾}w»»oģF¹»kÌÏ·{zP§B­¢íyÅt@@á]Yv_ssģ¼ißĻL¾ġsKD£¡N_X¸}B~HaiÅf{«x»ge_bsKF¯¡IxmELcÿZ¤­ĢÝsuBLùtYdmVtNmtOPhRw~bd¾qÐ\\âÙH\\bImlNZ»loqlVmGā§~QCw¤{A\\PKNY¯bFkC¥sks_Ã\\ă«¢ħkJi¯rrAhĹûç£CUĕĊ_ÔBixÅÙĄnªÑaM~ħpOu¥sîeQ¥¤^dkKwlL~{L~hw^ófćKyE­K­zuÔ¡qQ¤xZÑ¢^ļöÜ¾Ep±âbÊÑÆ^fk¬NC¾YpxbK~¥eÖäBlt¿Đx½I[ĒǙWf»Ĭ}d§dµùEuj¨IÆ¢¥dXªƅx¿]mtÏwßRĶX¢͎vÆzƂZò®ǢÌʆCrâºMÞzÆMÒÊÓŊZÄ¾r°Î®Ȉmª²ĈUªĚîøºĮ¦ÌĘk^FłĬhĚiĀĖ¾iİbjË"],
            "encodeOffsets": [[109366, 40242]]
        },
        "properties": {"cp": [ 105.9961,
            37.3096], "name": "宁夏", "childNum": 1}
    }, {
        "id": "650000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@QØĔ²X¨~ǘBºjʐßØvKƔX¨vĊOÃ·¢i@~cĝe_«E}QxgɪëÏÃ@sÅyXoŖ{ô«ŸuXêÎf`C¹ÂÿÐGĮÕĞXŪōŸMźÈƺQèĽôe|¿ƸJR¤ĘEjcUóº¯Ĩ_ŘÁMª÷Ð¥OéÈ¿ÖğǤǷÂFÒzÉx[]­Ĥĝœ¦EP}ûƥé¿İƷTėƫœŕƅƱB»Đ±ēO¦E}`cȺrĦáŖuÒª«ĲπdƺÏØZƴwʄ¤ĖGĐǂZĶèH¶}ÚZצʥĪï|ÇĦMŔ»İĝǈì¥Βba­¯¥ǕǚkĆŵĦɑĺƯxūД̵nơʃĽá½M»òmqóŘĝčË¾ăCćāƿÝɽ©ǱŅ»ēėŊLrÁ®ɱĕģŉǻ̋ȥơŻǛȡVï¹Ň۩ûkɗġƁ§ʇė̕ĩũƽō^ƕUv£ƁQïƵkŏ½ΉÃŭÇ³LŇʻ«ƭ\\lŭD{ʓDkaFÃÄa³ŤđÔGRÈƚhSӹŚsİ«ĐË[¥ÚDkº^Øg¼ŵ¸£EÍöůŉT¡c_ËKYƧUśĵÝU_©rETÏʜ±OñtYwē¨{£¨uM³x½şL©Ùá[ÓÐĥ Νtģ¢\\śnkOw¥±T»ƷFɯàĩÞáB¹ÆÑUwŕĽw]kE½Èå~Æ÷QyěCFmĭZīŵVÁƿQƛûXS²b½KÏ½ĉS©ŷXĕ{ĕK·¥Ɨcqq©f¿]ßDõU³h­gËÇïģÉɋwk¯í}I·œbmÉřīJɥĻˁ×xoɹīlc¤³Xù]ǅA¿w͉ì¥wÇN·ÂËnƾƍdÇ§đ®ƝvUm©³G\\}µĿQyŹlăµEwǇQ½yƋBe¶ŋÀůo¥AÉw@{Gpm¿AĳŽKLh³`ñcËtW±»ÕSëüÿďDu\\wwwù³VLŕOMËGh£õP¡erÏd{ġWÁč|yšg^ğyÁzÙs`s|ÉåªÇ}m¢Ń¨`x¥ù^}Ì¥H«YªƅAÐ¹n~ź¯f¤áÀzgÇDIÔ´AňĀÒ¶ûEYospõD[{ù°]uJqU|Soċxţ[õÔĥkŋÞŭZËºóYËüċrw ÞkrťË¿XGÉbřaDü·Ē÷AÃª[ÄäIÂ®BÕĐÞ_¢āĠpÛÄȉĖġDKwbmÄNôfƫVÉviǳHQµâFù­Âœ³¦{YGd¢ĚÜO {Ö¦ÞÍÀP^bƾl[vt×ĈÍEË¨¡Đ~´î¸ùÎhuè`¸HÕŔVºwĠââWò@{ÙNÝ´ə²ȕn{¿¥{l÷eé^eďXj©î\\ªÑòÜìc\\üqÕ[Č¡xoÂċªbØ­ø|¶ȴZdÆÂońéG\\¼C°ÌÆn´nxÊOĨŪƴĸ¢¸òTxÊǪMīĞÖŲÃɎOvʦƢ~FRěò¿ġ~åŊúN¸qĘ[Ĕ¶ÂćnÒPĒÜvúĀÊbÖ{Äî¸~Ŕünp¤ÂH¾ĄYÒ©ÊfºmÔĘcDoĬMŬS¤s²ʘÚžȂVŦ èW°ªB|ĲXŔþÈJĦÆæFĚêYĂªĂ]øªŖNÞüAfɨJ¯ÎrDDĤ`mz\\§~D¬{vJÂ«lµĂb¤pŌŰNĄ¨ĊXW|ų ¿¾ɄĦƐMTòP÷fØĶK¢ȝ˔Sô¹òEð­`Ɩ½ǒÂň×äı§ĤƝ§C~¡hlåǺŦŞkâ~}FøàĲaĞfƠ¥Ŕd®U¸źXv¢aƆúŪtŠųƠjdƺƺÅìnrh\\ĺ¯äɝĦ]èpĄ¦´LƞĬ´ƤǬ˼Ēɸ¤rºǼ²¨zÌPðŀbþ¹ļD¢¹\\ĜÑŚ¶ZƄ³âjĦoâȴLÊȮĐ­ĚăÀêZǚŐ¤qȂ\\L¢ŌİfÆs|zºeªÙæ§΢{Ā´ƐÚ¬¨Ĵà²łhʺKÞºÖTiƢ¾ªì°`öøu®Ê¾ãÖ"],
            "encodeOffsets": [[88824, 50096]]
        },
        "properties": {"cp": [ 84.9023,
            41.748], "name": "新疆", "childNum": 1}
    }, {
        "id": "110000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@RºaYÕQaúÍÔiþĩȨWĢü|Ėu[qb[swP@ÅğP¿{\\¯Y²·Ñ¨j¯X\\¯MSvU¯YIŕY{[fk­VÁûtŷmiÍt_H»Ĩ±d`¹­{bwYr³S]§§o¹qGtm_SŧoaFLgQN_dV@Zom_ć\\ßW´ÕiœRcfio§ËgToÛJíĔóu|wP¤XnO¢ÉŦ¯pNÄā¤zâŖÈRpŢZÚ{GrFt¦Òx§ø¹RóäV¤XdżâºWbwŚ¨Ud®bêņ¾jnŎGŃŶnzÚScîĚZen¬"],
            "encodeOffsets": [[119421, 42013]]
        },
        "properties": {"cp": [ 116.4551,
            40.2539], "name": "北京", "childNum": 1}
    }, {
        "id": "120000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@ŬgX§Ü«E¶FÌ¬O_ïlÁgz±AXeµÄĵ{¶]gitgIj·¥ì_iU¨ÐƎk}ĕ{gBqGf{¿aU^fIư³õ{YıëNĿk©ïËZukāAīlĕĥs¡bġ«@dekąI[nlPqCnp{ō³°`{PNdƗqSÄĻNNâyj]äÒD ĬH°Æ]~¡HO¾X}ÐxgpgWrDGpù^LrzWxZ^¨´T\\|~@IzbĤjeĊªz£®ĔvěLmV¾Ô_ÈNW~zbĬvG²ZmDM~~"],
            "encodeOffsets": [[120237, 41215]]
        },
        "properties": {"cp": [ 117.4219,
            39.4189], "name": "天津", "childNum": 1}
    }, {
        "id": "310000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@ɧư¬EpƸÁx]", "@@©²", "@@MA", "@@QpªKWT§¨", "@@bŝÕÕEȣÚƥêImɇǦèÜĠÚÄÓŴ·ʌÇ", "@@Sô¤r]ìƬįǜûȬɋŭ×^sYɍDŋŽąñCG²«ªč@h_p¯A{oloY¬j@Ĳ`gQÚpptǀ^MĲvtbe´Rh@oj¨", "@@ÆLH{a}Eo¦"]],
            "encodeOffsets": [[[124702, 32062], [124547, 32200], [124808, 31991], [124726, 32110], [124903, 32376], [124065, 32166], [124870, 31965]]]
        },
        "properties": {"cp": [ 121.4648,
            31.2891], "name": "上海", "childNum": 7}
    }, {
        "id": "500000",
        "geometry": {
            "type": "Polygon",
            "coordinates": ["@@TÂÛ`Ùƅően½SêqDu[RåÍ¹÷eXÍy¸_ĺę}÷`M¯ċfCVµqŉ÷Zgg^d½pDOÎCn^uf²ènh¼WtƏxRGg¦pVFI±G^Ic´ecGĹÞ½sëÆNäÌ¤KÓe¯|R¸§LÜkPoïƭNï¶}Gywdiù©nkĈzj@Óc£»Wă¹Óf§c[µo·Ó|MvÛaq½«è\\ÂoVnÓØÍ²«bq¿ehCĜ^Q~ Évýş¤²ĮpEĶyhsŊwH½¿gÅ¡ýE¡ya£³t\\¨\\vú¹¼©·Ñr_oÒý¥et³]Et©uÖ¥±ă©KVeë]}wVPÀFA¨ąB}qTjgRemfFmQFÝMyùnÑAmÑCawu_p¯sfÛ_gI_pNysB¦zG¸rHeN\\CvEsÐñÚkcDÖĉsaQ¯}_UzÁē}^R Äd^ÍĸZ¾·¶`wećJE¹vÛ·HgéFXjÉê`|ypxkAwWĐpb¥eOsmzwqChóUQl¥F^lafanòsrEvfQdÁUVfÎvÜ^eftET¬ôA\\¢sJnQTjPØxøK|nBzĞ»LYFDxÓvr[ehľvN¢o¾NiÂxGpâ¬zbfZo~hGi]öF||NbtOMn eA±tPTLjpYQ|SHYĀxinzDJÌg¢và¥Pg_ÇzIIII£®S¬ØsÎ¼¥¨^LnGĲļĲƤjÎƀƾ¹¸ØÎezĆT¸}êÐqHðqĖä¥^CÆIj²p\\_ æüY|[YxƊæu°xb®Űb@~¢NQt°¶Sæ Ê~rǉĔëĚ¢~uf`faĔJåĊnÔ]jƎćÊ@£¾a®£Ű{ŶĕFègLk{Y|¡ĜWƔtƬJÑxq±ĢN´òKLÈÃ¼D|s`ŋć]Ã`đMùƱ¿~Y°ħ`ƏíW½eI½{aOIrÏ¡ĕŇapµÜƃġ²"],
            "encodeOffsets": [[111728, 31311]]
        },
        "properties": {"cp": [ 107.3539,
            29.5904], "name": "重庆", "childNum": 1}
    }, {
        "id": "810000",
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [["@@AlFi", "@@mp", "@@EpHo", "@@rMUwAS¬]", "@@ea¢pl¸Eõ¹hj[]ÔCÎ@lj¡uBX´AI¹[yDU]W`çwZkmcMpÅv}IoJlcafŃK°ä¬XJmÐ đhI®æÔtSHnEÒrÄc"]],
            "encodeOffsets": [[[117111, 23002], [117072, 22876], [117045, 22887], [116882, 22747], [116975, 23082]]]
        },
        "properties": {"cp": [114.2578,
            22.3242], "name": "香港", "childNum": 5}
    }, {
        "id": "820000",
        "geometry": {"type": "Polygon", "coordinates": ["@@áw{Îr"], "encodeOffsets": [[116285, 22746]]},
        "properties": {"cp": [ 113.55,
            22.1484], "name": "澳门", "childNum": 1}
    }],
    "UTF8Encoding": true
}

featuresDataArr = mapJson.features;
$(function () {
    //设置标题信息
    $('#titleContainer').html(back_ground_info['front.workspace.bigscreen.supervise.area'].textContent + '大数据');


    new AreaSelect({
        areaInfoUrl: BACK_ROOT + '/bigscreen/area/getbyid.do',
        url: BACK_ROOT + '/bigscreen/area/childlist.do',
        container: $('.location'),
        defaultBaseAreaId: back_ground_info['baseAreaId'],
        callback: function (baseAreaId, areaCode, areaLevel, areaName) {
            onAreaChange(baseAreaId, areaCode, areaLevel, areaName);
        }
    }).init();

    //数据类型切换
    $('.filter-type1').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        dataType = $(this).data('type');
        if (dataType == 'subject') {
            subjectAndClasslevelList(subjectDataList, dataType);
        } else if (dataType == 'classlevel') {
            subjectAndClasslevelList(classlevelDataList, dataType);
        }
    });
    $('.filter-type2').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        dataType = $(this).data('type');
        if (dataType == 'baseArea') {
            areaAndTeacherList(areaDataListTop, dataType);
        } else if (dataType == 'teacher') {
            areaAndTeacherList(userDataListTop, dataType);
        }
    });


    $("#baseTrimesterContainer").on('change', 'select', function () {
        trimesterId = $("#baseTrimesterContainer select option:checked").val();
        interStartLesson(currentBaseAreaId, trimesterId);
    });
});


var lastAreaMapLevel = 3;
var dateMapRegisterCode;
var mapDataExist = true;
var livingDataInterval;
function onAreaChange(baseAreaId, areaCode, areaLevel, areaName) {
    clearInterval(livingDataInterval);
    currentBaseAreaId = baseAreaId;
    resetData(baseAreaId, areaCode);


    classBuild(baseAreaId);
    getBenefitStudentCnt(baseAreaId);
    livingData(baseAreaId);
    livingDataInterval = setInterval(livingData, 60000, baseAreaId);
    //授课分析
    courseAnalysis(baseAreaId);
    //本周情况
    thisWeek(baseAreaId);
    //查询区域学期
    getBaseTrimester(baseAreaId);
    var trimesterId = $('#baseTrimesterContainer select option:checked').val();
    interStartLesson(baseAreaId, trimesterId);

    //下级行政区数据
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulesubareadata.do', {baseAreaId: baseAreaId}, function (data) {
        //地图数据
    data={"message":"操作成功","result":{"areaData":[{"areaCode":"120000","areaIdPath":null,"areaName":"天津市","baseAreaId":"8405b0c51d984ca2b92b8ee1a6b44900","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":120136,"realBeginTime":null,"realCourseCnt":13651,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"340000","areaIdPath":null,"areaName":"安徽省","baseAreaId":"119fb409f8ba41e4bb068f09e9b83757","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":317499,"realBeginTime":null,"realCourseCnt":174181,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"420000","areaIdPath":null,"areaName":"湖北省","baseAreaId":"328abcfe0b944c25bc1ffaf7fb814cd6","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":77790,"realBeginTime":null,"realCourseCnt":11073,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"660000","areaIdPath":null,"areaName":"新疆生产建设兵团","baseAreaId":"a8d0873f6742420991dc245fcc4dea60","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":2972,"realBeginTime":null,"realCourseCnt":1018,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"610000","areaIdPath":null,"areaName":"陕西省","baseAreaId":"87359d79730e493a8817ea28c2e95fb0","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":28642,"realBeginTime":null,"realCourseCnt":1285,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"350000","areaIdPath":null,"areaName":"福建省","baseAreaId":"5e6ec9ba20ba4a949a99964def9f9d87","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":20395,"realBeginTime":null,"realCourseCnt":2249,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"360000","areaIdPath":null,"areaName":"江西省","baseAreaId":"98b9e7423fb348d994a4eb482f4a6cac","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":18289,"realBeginTime":null,"realCourseCnt":3513,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"430000","areaIdPath":null,"areaName":"湖南省","baseAreaId":"bdef166ec5ca4691aa7be594c4f6303d","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":12902,"realBeginTime":null,"realCourseCnt":1121,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"510000","areaIdPath":null,"areaName":"四川省","baseAreaId":"40a14953960d46ab884fa61321e7e4c6","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":24544,"realBeginTime":null,"realCourseCnt":1755,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"320000","areaIdPath":null,"areaName":"江苏省","baseAreaId":"054520e385c04f1ba78e34f42f032456","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":38829,"realBeginTime":null,"realCourseCnt":2749,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"450000","areaIdPath":null,"areaName":"广西壮族自治区","baseAreaId":"ceae823c5c3b48008c62ddd32ae29357","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":15932,"realBeginTime":null,"realCourseCnt":1462,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"370000","areaIdPath":null,"areaName":"山东省","baseAreaId":"08c7ac76c8aa44ae9da4a506319ec592","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":15806,"realBeginTime":null,"realCourseCnt":2196,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"330000","areaIdPath":null,"areaName":"浙江省","baseAreaId":"be31d143b7f44cc194088d72abf90639","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":43743,"realBeginTime":null,"realCourseCnt":979,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"290000","areaIdPath":null,"areaName":"阔地教育","baseAreaId":"3e3eab9c849249aeb4449420b5e9bdb5","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":25949,"realBeginTime":null,"realCourseCnt":2266,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"150000","areaIdPath":null,"areaName":"内蒙古自治区","baseAreaId":"5adeaa227feb46d683f66064a54f84f9","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":58113,"realBeginTime":null,"realCourseCnt":3426,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"460000","areaIdPath":null,"areaName":"海南省","baseAreaId":"eb7ab0ea3cac4572b2d5389f8bf0a988","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":20371,"realBeginTime":null,"realCourseCnt":160,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"500000","areaIdPath":null,"areaName":"重庆市","baseAreaId":"d238ad54158742fc986157193589cd61","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":29424,"realBeginTime":null,"realCourseCnt":1341,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"620000","areaIdPath":null,"areaName":"甘肃省","baseAreaId":"0069e569790947968afa96c4382032e7","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":10288,"realBeginTime":null,"realCourseCnt":554,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"410000","areaIdPath":null,"areaName":"河南省","baseAreaId":"5db7fa9691a44f6b9102176684f9e220","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":12916,"realBeginTime":null,"realCourseCnt":903,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"520000","areaIdPath":null,"areaName":"贵州省","baseAreaId":"ccb32ac21b284a3b872cda4a5595c714","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":4051,"realBeginTime":null,"realCourseCnt":391,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"630000","areaIdPath":null,"areaName":"青海省","baseAreaId":"05fc7c5ee5e840f98eb801f7e240d7e4","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":2032,"realBeginTime":null,"realCourseCnt":14,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"640000","areaIdPath":null,"areaName":"宁夏回族自治区","baseAreaId":"1a472045f0f243128d7c7441bc089765","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":19087,"realBeginTime":null,"realCourseCnt":1227,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"210000","areaIdPath":null,"areaName":"辽宁省","baseAreaId":"ffe690a20b484ddc9c5e1aec5d6cf000","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":8958,"realBeginTime":null,"realCourseCnt":261,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"140000","areaIdPath":null,"areaName":"山西省","baseAreaId":"ba74e8ff0493418db0d962c0cbaf3e56","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":1286,"realBeginTime":null,"realCourseCnt":78,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"530000","areaIdPath":null,"areaName":"云南省","baseAreaId":"867fa27079c04a86a7301eff0ad7578e","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":67340,"realBeginTime":null,"realCourseCnt":4186,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"130000","areaIdPath":null,"areaName":"河北省","baseAreaId":"89a7acdc01494fca9092ae7fc0773228","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":8249,"realBeginTime":null,"realCourseCnt":1049,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"540000","areaIdPath":null,"areaName":"西藏自治区","baseAreaId":"f5719230701d4285b447894208d7d881","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":1098,"realBeginTime":null,"realCourseCnt":50,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"440000","areaIdPath":null,"areaName":"广东省","baseAreaId":"790b9df8122543fba55580d61e092fd7","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":2145,"realBeginTime":null,"realCourseCnt":231,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"220000","areaIdPath":null,"areaName":"吉林省","baseAreaId":"48fa8e4645364473808bec9b8f4f0666","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":1252,"realBeginTime":null,"realCourseCnt":396,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"650000","areaIdPath":null,"areaName":"新疆维吾尔自治区","baseAreaId":"53344bcdf0304e9a9313d5cec047a1c2","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":20448,"realBeginTime":null,"realCourseCnt":1696,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"230000","areaIdPath":null,"areaName":"黑龙江省","baseAreaId":"5f236d2da717419389e70d5a6fe56d3a","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":9322,"realBeginTime":null,"realCourseCnt":1035,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"310000","areaIdPath":null,"areaName":"上海市","baseAreaId":"547d44a8a30b4dab82c01d1e94576f9f","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":1108,"realBeginTime":null,"realCourseCnt":17,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"110000","areaIdPath":null,"areaName":"北京市","baseAreaId":"e74ae158728d4540b76acdf3da4ef8dd","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":326,"realBeginTime":null,"realCourseCnt":28,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"810000","areaIdPath":null,"areaName":"香港特别行政区","baseAreaId":"f112f0a1e8fd4c3ca1cc66485aafcb61","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":154,"realBeginTime":null,"realCourseCnt":17,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null}],"areaDataTop":[{"areaCode":"340000","areaIdPath":null,"areaName":"安徽省","baseAreaId":"119fb409f8ba41e4bb068f09e9b83757","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":317499,"realBeginTime":null,"realCourseCnt":174181,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"120000","areaIdPath":null,"areaName":"天津市","baseAreaId":"8405b0c51d984ca2b92b8ee1a6b44900","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":120136,"realBeginTime":null,"realCourseCnt":13651,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"420000","areaIdPath":null,"areaName":"湖北省","baseAreaId":"328abcfe0b944c25bc1ffaf7fb814cd6","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":77790,"realBeginTime":null,"realCourseCnt":11073,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"530000","areaIdPath":null,"areaName":"云南省","baseAreaId":"867fa27079c04a86a7301eff0ad7578e","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":67340,"realBeginTime":null,"realCourseCnt":4186,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"360000","areaIdPath":null,"areaName":"江西省","baseAreaId":"98b9e7423fb348d994a4eb482f4a6cac","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":18289,"realBeginTime":null,"realCourseCnt":3513,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"150000","areaIdPath":null,"areaName":"内蒙古自治区","baseAreaId":"5adeaa227feb46d683f66064a54f84f9","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":58113,"realBeginTime":null,"realCourseCnt":3426,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"320000","areaIdPath":null,"areaName":"江苏省","baseAreaId":"054520e385c04f1ba78e34f42f032456","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":38829,"realBeginTime":null,"realCourseCnt":2749,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"290000","areaIdPath":null,"areaName":"阔地教育","baseAreaId":"3e3eab9c849249aeb4449420b5e9bdb5","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":25949,"realBeginTime":null,"realCourseCnt":2266,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"350000","areaIdPath":null,"areaName":"福建省","baseAreaId":"5e6ec9ba20ba4a949a99964def9f9d87","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":20395,"realBeginTime":null,"realCourseCnt":2249,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null},{"areaCode":"370000","areaIdPath":null,"areaName":"山东省","baseAreaId":"08c7ac76c8aa44ae9da4a506319ec592","baseClasslevelId":null,"baseSubjectId":null,"baseUserId":null,"beginTime":null,"classStatus":null,"classlevelName":null,"classlevelSort":null,"clsSchoolId":null,"planCourseCnt":15806,"realBeginTime":null,"realCourseCnt":2196,"roomType":null,"scheduleCount":0,"status":null,"subjectName":null,"teacherUserName":null,"userName":null}]},"retcode":"","status":1}
    data = data.result;
        var hasChildArea = true;
        //最后一级行政区域查询直属校统计资源
        $.ajax({
            url: BACK_ROOT + '/bigscreen/area/getchildrenareacount.do',
            data: {baseAreaId: baseAreaId},
            async: false,
            success: function (data) {
                if (data == 0) {
                    hasChildArea = false;
                }
            }
        });

        var areaMapData = [];
        areaDataListTop = data.areaDataTop;
        areaMapData = data.areaData;
        if (hasChildArea) {
            $('#areaNameContainer').html('行政区排行');
            areaDataListTop = data.areaDataTop;
            areaMapData = data.areaData;
        } else {
            $('#areaNameContainer').html('学校排行');
            var planCourseCnt = 0;
            $.ajax({
                url: BACK_ROOT + '/bigscreen/classroom/getdirectscheduleschoolcountdata.do',
                data: {baseAreaId: baseAreaId},
                async: false,
                success: function (data) {
                    data = data.result;
                    $.each(data, function (i, d) {
                        d.areaName = d.schoolName;
                        planCourseCnt += d.planCourseCnt;
                    });
                    areaDataListTop = data;
                    if (data.length > 0) {
                        areaMapData = [{areaName: areaName, areaCode: areaCode, planCourseCnt: planCourseCnt}];
                    }
                }
            });
        }

        mapData(areaMapData, "china", 1);

        areaDataListTop.reverse();
        if ($('.filter-type2 li.active').data('type') == 'baseArea') {
            areaAndTeacherList(areaDataListTop, 'baseArea');
        }
    });

    //学科统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulesubjectdata.do', {baseAreaId: baseAreaId}, function (data) {
        subjectDataList = data.result;
        if ($('.filter-type1 li.active').data('type') == 'subject') {
            subjectAndClasslevelList(subjectDataList, 'subject');
        }
    });

    //年级统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getscheduleclassleveldata.do', {baseAreaId: baseAreaId}, function (data) {
        classlevelDataList = data.result;
        if ($('.filter-type1 li.active').data('type') == 'classlevel') {
            subjectAndClasslevelList(classlevelDataList, 'classlevel');
        }
    });

    //教师排行
    $.get(BACK_ROOT + '/bigscreen/classroom/getscheduleteacherdata.do', {baseAreaId: baseAreaId}, function (data) {
        userDataListTop = data.result;
        userDataListTop.reverse();
        if ($('.filter-type2 li.active').data('type') == 'teacher') {
            areaAndTeacherList(userDataListTop, 'teacher');
        }
    });

    //开课状态数量统计
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulestatusdata.do', {baseAreaId: baseAreaId}, function (data) {
        scheduleClassStatus(data.result.validCourseCnt, data.result.invalidCourseCnt)
        scheduleStatusCnt(data.result);
    });
}

var areaDataListTop;
var userDataListTop;
var classlevelDataList;
var subjectDataList;


//受益学生人数
function getBenefitStudentCnt(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getbenefitstudentcnt.do', {baseAreaId: baseAreaId}, function (data) {
        var stuCnt = data.result;
        var stuCntHtml = '';
        for (var i = 0; i < stuCnt.toString().length; i++) {
            stuCntHtml += '<li>' + stuCnt.toString()[i] + '</li>';
        }
        $('.studentCnt').html(stuCntHtml);
    });
}

//查询区域的学期
function getBaseTrimester(baseAreaId) {
    $.ajax({
        url: BACK_ROOT + '/bigscreen/trimester/getbyareaid.do',
        data: {baseAreaId: baseAreaId},
        async: false,
        success: function (data) {
            var html = '<select>';
            var trimesters = data.result;
            $.each(trimesters, function (i, d) {
                html += '<option value="' + d.baseTrimesterId + '">' + d.trimesterName + '</option>';
            });
            html += '</select>';
            $('#baseTrimesterContainer').html(html);
        }
    });
}


// ----------------------------------------数据渲染方法

//教室建设
function classBuild(baseAreaId) {
    var receiveRoomCnt = 0, masterRoomCnt = 0;
    $.get(BACK_ROOT + '/bigscreen/classroom/classroomtypedata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, total = {};
        receiveRoomCnt = data.receiveRoomCnt;
        masterRoomCnt = data.masterRoomCnt;
        setOptionClassBuild(masterRoomCnt, receiveRoomCnt);
    });
}
function setOptionClassBuild(masterRoomCnt, receiveRoomCnt) {
    var total = masterRoomCnt + receiveRoomCnt;
    var masterRoomCntShadow = total - masterRoomCnt;

    var receiveRoomCntShadow = total - receiveRoomCnt;
    var masterData = [
        {
            value: masterRoomCntShadow,
            name: 'shadow',
            itemStyle: {
                normal: {
                    borderColor: "#112958",
                    color: "#112958"
                }
            }
        },
        {
            value: masterRoomCnt,
            name: 'mainSubject',
            itemStyle: {
                normal: {
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1d69f1'
                    }, {
                        offset: 1,
                        color: '#1ad1fc'
                    }]),
                    shadowBlur: 20,
                    shadowColor: 'rgba(28,132,244,0.6)',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#1d69f1'
                    }, {
                        offset: 1,
                        color: '#1ad1fc'
                    }]),
                }
            }
        }
    ];
    var receiveData = [
        {
            value: receiveRoomCntShadow,
            name: 'shadow',
            itemStyle: {
                normal: {
                    borderColor: "#112958",
                    color: "#112958"
                }
            }
        },
        {
            value: receiveRoomCnt,
            name: 'mainSubject',
            itemStyle: {
                normal: {
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#09994c'
                    }, {
                        offset: 1,
                        color: '#3ef99b'
                    }]),
                    shadowBlur: 20,
                    shadowColor: 'rgba(28,132,244,0.6)',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#09994c'
                    }, {
                        offset: 1,
                        color: '#3ef99b'
                    }]),
                }
            }
        }
    ];
    if (total == 0) {
        masterData = [
            {
                value: masterRoomCntShadow,
                name: 'shadow',
                itemStyle: {
                    normal: {
                        borderColor: "#112958",
                        color: "#112958"
                    }
                }
            }
        ];
        receiveData = [
            {
                value: receiveRoomCntShadow,
                name: 'shadow',
                itemStyle: {
                    normal: {
                        borderColor: "#112958",
                        color: "#112958"
                    }
                }
            }
        ];
    }
    var masterRoomRatio;
    var receiveRoomRatio;

    if (total == 0) {
        masterRoomRatio = '0%';
        receiveRoomRatio = '0%';
    } else {
        masterRoomRatio = (masterRoomCnt * 100 / total).toFixed(0);
        receiveRoomRatio = 100 - masterRoomRatio;
        masterRoomRatio += '%';
        receiveRoomRatio += '%';
    }
    $('.class-build .echart-text li:nth-child(1)').html('<p>' + masterRoomCnt + '</p>');
    $('.class-build  .echart-text li:nth-child(2)').html('<p>' + receiveRoomCnt + '</p>');

    echart1.setOption({
        tooltip: {
            trigger: 'item',
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            show: true,
            formatter: function (param) {
                if (param.data.name == 'shadow') {
                    return '';
                }
                var html = '主讲教室<br/>';
                html += '教室数量：' + masterRoomCnt + '<br/>';
                html += '教室占比：' + masterRoomRatio;
                return html;
            }
        },
        series: [{
            name: masterRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['64', '80'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowColor: '#112958' //边框阴影
                }
            },
            data: masterData
        }]
    });

    echart2.setOption({
        tooltip: {
            trigger: 'item',
            show: true,
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            formatter: function (param) {
                if (param.data.name == 'shadow') {
                    return '';
                }
                var html = '接收教室<br/>';
                html += '教室数量：' + receiveRoomCnt + '<br/>';
                html += '教室占比：' + receiveRoomRatio;
                return html;
            }
        },
        series: [{
            name: receiveRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['64', '80'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
                }
            },
            data: receiveData
        }]
    });
}
//实时动态
function livingData(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getschedulerealtimedata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, Tpl = '';
        if (data) {
            Tpl += '<li>' + data.livingCourseCnt + '</li>';
            Tpl += '<li>' + data.joinUserCnt + '</li>';
            Tpl += '<li>' + data.finishedCourseCnt + '</li>';
            Tpl += '<li>' + data.planCourseCnt + '</li>';
        }
        $('.living-status .status-data').html(Tpl);


        var textData, receiveRoomCnt, masterRoomCnt, faultRoomCnt;

        receiveRoomCnt = data.receiveRoomCnt;
        masterRoomCnt = data.masterRoomCnt;
        faultRoomCnt = data.abnormalRoomCnt;
        textData = receiveRoomCnt + masterRoomCnt;

        setOptionlivingData(textData, masterRoomCnt, receiveRoomCnt, faultRoomCnt);
    });
}
function setOptionlivingData(textData, masterRoomCnt, receiveRoomCnt, faultRoomCnt) {
    var faultMax = Math.max.call(receiveRoomCnt, masterRoomCnt, faultRoomCnt);
    faultMax = faultMax * 1.2;
    var circleData = function (val) {
        let total = faultMax;
        let count = val;
        let shadeCount;
        let noneCount = faultMax * 0.25;
        if (val > total) {
            count = total;
            shadeCount = 0;
        } else if (val == 0) {
            total = 1;
            shadeCount = total * 0.75;
            count = 0;
            noneCount = total * 0.25
        } else {
            shadeCount = total - val;
        }
        return {
            count: count,
            shadeCount: shadeCount,
            noneCount: noneCount,
        }
    };

    placeHolderStyle = {
        normal: {
            borderWidth: 5,
            shadowBlur: 40,
            borderColor: "#132235",
            shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
            color: "#132235"
        }
    };

    echart3.setOption({
        title: {
            show: true,
            text: textData + '间正在直播',
            right: 20,
            top: 40,
            textStyle: {
                fontSize: 16,
                color: '#19a3dd'
            }
        },
        color: ['#1c68e5', '#11a754'],
        tooltip: {
            show: false,
            trigger: 'item'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: '13%',
            top: '40%',
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 10,
            textStyle: {
                color: ['#1bbcfa', '#5beca0'],
                fontSize: 12
            },
            data: ['主讲教室 ' + masterRoomCnt, '接入教室 ' + receiveRoomCnt]
        },
        series: [
            {
                name: '主讲教室 ' + masterRoomCnt,
                type: 'pie',
                clockWise: false,
                radius: ['51%', '55%'],
                center: ['30%', '50%'],
                hoverAnimation: false, //鼠标移入变大
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1d69f1'
                        }, {
                            offset: 1,
                            color: '#1bbcfa'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [
                    {
                        value: circleData(masterRoomCnt).count,
                        name: '主讲教室'
                    },
                    {
                        value: circleData(masterRoomCnt).shadeCount,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                    {
                        value: circleData(masterRoomCnt).noneCount,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: 'none'
                            }
                        }
                    }
                ]
            }, {
                name: '接入教室 ' + receiveRoomCnt,
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: ['31%', '35%'],
                center: ['30%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 5,
                        shadowBlur: 40,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#20a65a'
                        }, {
                            offset: 1,
                            color: '#5beca0'
                        }]),
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [
                    {
                        value: circleData(receiveRoomCnt).count,
                        name: '接入教室'
                    },
                    {
                        value: circleData(receiveRoomCnt).shadeCount,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                    {
                        value: circleData(receiveRoomCnt).noneCount,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: 'none'
                            }
                        }
                    }
                ]
            }]
    });

//概率环图处理 解决溢出问题
    option4 = {
        title: {
            show: true,
            text: '未正常接入',
            right: 30,
            top: 40,
            textStyle: {
                fontSize: 16,
                color: '#ff3361'
            }
        },
        // color: ['#ff7b5f'],
        tooltip: {
            trigger: 'item',
            show: false
            // formatter:"<p class='center'>{b}</p><p class='center'>{c}</p>"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: '22%',
            top: '40%',
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 10,
            textStyle: {
                color: '#ff3361',
                fontSize: 12
            },
            data: ['' + faultRoomCnt]
        },
        series: [{
            name: '' + faultRoomCnt,
            type: 'pie',
            clockWise: false,
            radius: ['51%', '55%'],
            center: ['30%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#ff7b5f'
                    }, {
                        offset: 1,
                        color: '#ff3361'
                    }]),
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [
                {
                    value: circleData(faultRoomCnt).count,
                    name: '未正常接入'
                },
                {
                    value: circleData(faultRoomCnt).shadeCount,
                    name: '',
                    itemStyle: placeHolderStyle
                }, {
                    value: circleData(faultRoomCnt).noneCount,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: 'none',
                            borderColor: 'none'
                        }
                    }
                }
            ]
        }]
    };
    echart4.setOption(option4);
}
//学科年级分布
function subjectAndClasslevelList(data, type) {
    echart5.clear();
    if (data.length == 0) {
        $('.sg-distribution .no-data').show();
        echart5.clear();
        return false;
    } else {
        $('.sg-distribution .no-data').hide();
    }
    var category = [], roomCnt = [];
    var totalCount = 0;
    var scheduleCountRatio = [];
    for (var i = 0; i < data.length; i++) {
        if (type == 'classlevel') {
            category.push(data[i].classlevelName);
        } else if (type == 'subject') {
            category.push(data[i].subjectName);
        }
        roomCnt.push(data[i].scheduleCount);
        totalCount += data[i].scheduleCount;
    }

    for (var i = 0; i < data.length; i++) {
        scheduleCountRatio.push((data[i].scheduleCount * 100 / totalCount).toFixed(0));
    }

    var dataZoom = [{show: false},
        {
            type: "inside",
            show: false,
            zoomLock: true,
        }];
    if (data.length > 10) {
        // var start = (data.length - 8)/ 2;
        // var end = start + 9;
        dataZoom = [
            {
                show: true,
                height: 8,
                width: '50%',
                xAxisIndex: [0],
                bottom: 2,
                left: 'center',
                startValue: 1,
                endValue: 10,
                fillerColor: '#1e7eb0',
                dataBackground: {
                    areaStyle: {
                        color: '#222e43'
                    }
                },
                handleStyle: {
                    color: "#1e7eb0"
                },
                textStyle: {
                    color: "#fff"
                },
                borderColor: "#222e43",
                borderRadius: 8,
                borderWidth: 2
            },
            {
                type: "inside",
                show: true,
                zoomLock: true,
            }
        ];
    }

    echart5.setOption({
        tooltip: {
            trigger: 'axis',
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: 10,
            position: function (p) {
                return [p[0] + 10, p[1] - 10];
            },
            showContent: true,
            formatter: function (param) {
                var html = param[0].axisValue + '<br/>';
                html += '课程数量：' + roomCnt[param[0].dataIndex] + '<br/>';
                html += '课程占比：' + param[0].value + '%';
                return html;
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#ffff00'
                }
            },
        },
        grid: {
            show: false,
            top: '6%',
            left: '8',
            right: '15',
            containLabel: true,
        },
        dataZoom: dataZoom,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                interval: '0',
                show: true,
                inside: false,
                rotate: 45,
                margin: 2,
                textStyle: {
                    fontSize: 12,
                    color: '#a5a6bb'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: category,
            offset: 15
        },
        yAxis: {
            type: 'value',
            data: ['10%', '100%'],
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                margin: 10,
                textStyle: {
                    fontSize: 13,
                    color: '#a5a6bb',
                    fontFamily: 'PingFangRegular'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#273651',
                    width: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.7)',
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    opacity: '0.3'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            type: 'line',
            smooth: false,
            symbolSize: 6,
            hoverAnimation: false,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(25, 153, 227, 0.7)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(25, 153, 227, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#1999e3'
                },
                emphasis: {
                    "borderColor": "rgba(208,234,253, 0.3)",
                    "borderWidth": 9,
                },
            },
            data: scheduleCountRatio
        }]
    });
}

//实际开课总量+计划开课总量+开课占比
function scheduleStatusCnt(data) {
    var realCourseCnt = data.validCourseCnt;
    var planCourseCnt = data.planCourseCnt;

    var realCourseCntHtml = '', planCourseCntHtml = '';
    var courseRatio = '0', courseRatioHtml = '';
    if (planCourseCnt > 0) {
        var courseRatio = realCourseCnt * 100 / planCourseCnt;
        if(courseRatio > 0.95) {
            courseRatio = courseRatio.toFixed(0);
        } else {
            courseRatio = parseFloat(courseRatio.toFixed(1)) + '';
        }
    }

    for (var i = 0; i < realCourseCnt.toString().length; i++) {
        realCourseCntHtml += '<li>' + realCourseCnt.toString()[i] + '</li>';
    }
    for (var i = 0; i < planCourseCnt.toString().length; i++) {
        planCourseCntHtml += '<li>' + planCourseCnt.toString()[i] + '</li>';
    }
    for (var i = 0; i < courseRatio.length; i++) {
        courseRatioHtml += '<li>' + courseRatio[i] + '</li>';
    }
    courseRatioHtml += '<li>%</li>';
    $('.allCourseCnt').html(realCourseCntHtml);
    $('.unStartCourseCnt').html(planCourseCntHtml);
    $('.realCourseRatio').html(courseRatioHtml);
}

function echartMapSize(areaCode) {
    var layoutCenter = ['50%', '50%'];
    var layoutSize = '75%';
    //配置特殊地图区域位置和大小
    if ((!areaCode) || (areaCode == 'china') || (areaCode == '000000')) {
        //中国的配置
        layoutSize = '100%';
    }
    if (areaCode == '230000') {
        //黑龙江的配置
        layoutCenter = ['50%', '60%'];
        layoutSize = '65%';
    } else if (areaCode == '620000') {
        //甘肃的配置
        layoutCenter = ['60%', '60%'];
        layoutSize = '65%';
    } else if (areaCode == '350000') {
        //福建的配置
        layoutCenter = ['50%', '40%'];
    }
    return {
        layoutCenter: layoutCenter,
        layoutSize: layoutSize
    };
}

//地图数据(气泡图)中
function mapData(data, areaCode, areaLevel) {
    if (typeof data == 'undefined') {
        return false;
    }
    //if (!mapDataExist) {
       // echart6.clear();
      //  return false;
   // }
    var geoCoordMap = {};

    /*获取地图数据*/
    var mapFeatures = featuresDataArr;
    mapFeatures.forEach(function (v) {
        // 地区名称
        var areaCode = v.id;
        // 地区经纬度
        geoCoordMap[areaCode] = v.properties.cp;
    });

    var planCourseCnt = [];
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].areaCode];
            if (geoCoord) {
                res.push({
                    name: data[i].areaName,
                    value: geoCoord.concat(data[i].planCourseCnt),
                });
            }
        }
        return res;
    };
    for (var i = 0; i < data.length; i++) {
        planCourseCnt.push(data[i].planCourseCnt);
    }
    var oMax = Math.max.apply(null, planCourseCnt);
    var oMin = Math.min.apply(null, planCourseCnt);
    var mapSize = echartMapSize(areaCode);

    option = {
        geo: {
            map: areaCode,
            mapType: "china",
            type: "map",
            left: 'center',
            label: {
                normal: {
                    show: true,
                    color: '#8dbdff'
                },
                emphasis: {
                    show: false,
                    color: '#8dbdff'
                }
            },
            layoutCenter: mapSize.layoutCenter,
            layoutSize: mapSize.layoutSize,
            roam: false,
            itemStyle: {
                borderSize: '2',
                normal: {
                    color: '#072558',
                    borderColor: '#12d7f7',
                    borderSize: '2'
                },
                emphasis: {
                    color: '#2382c1'
                }
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: 'rgba(255,255,255,0.3)',
            borderRadius: 8,
            borderWidth: 0,
            padding: [5, 10],
            formatter: function (param) {
                var html = param.data.name + '<br/>';
                html += '计划开课：' + param.data.value[2];
                return html;
            }
        },
        series: [

            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function (val) {
                    // 映射到对应[30,70]区间
                    if (oMax == oMin) {
                        return 55;
                    }
                    var size = (val[2] - oMin) * 40;
                    size = size / (oMax - oMin) + 30;
                    return size;
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#79b2ff', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            }
        ]
    };
    echart6.setOption(option);
}


//互动课堂开课分析
function interStartLesson(baseAreaId, trimesterId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/curvegraphdata.do', {baseAreaId: baseAreaId, trimesterId: trimesterId}).done(function (data) {
        var data = data.result;
        var dataZoom;
        if (data.planCourseData.length == 0 && data.realCourseData.length == 0 && data.startCourseRatioData.length == 0) {
            $('.course-analysis .no-data').show();
            $('.course-analysis .axisxy-title').hide();
            echart7.clear();
            return false;
        } else {
            $('.course-analysis .no-data').hide();
            $('.course-analysis .axisxy-title').show();
        }

        var weekCount = data.planCourseData.length;
        var xData = function () {
            var data = [];
            for (var i = 0; i < weekCount; i++) {
                var j = i + 1;
                data.push(j);
            }
            return data;
        }();
        if (data.planCourseData.length > 10) {
            var start = (data.planCourseData.length - 8) / 2;
            var end = start + 9;
            dataZoom = [
                {
                    show: true,
                    height: 8,
                    width: '50%',
                    xAxisIndex: [0],
                    bottom: 5,
                    left: 'center',
                    startValue: start,
                    endValue: end,
                    fillerColor: '#1e7eb0',
                    dataBackground: {
                        areaStyle: {
                            color: '#222e43'
                        }
                    },
                    handleStyle: {
                        color: "#1e7eb0"
                    },
                    textStyle: {
                        color: "#fff"
                    },
                    borderColor: "#222e43",
                    borderRadius: 8,
                    borderWidth: 2
                },
                {
                    type: "inside",
                    show: true,
                    zoomLock: true,
                }
            ];
        } else {
            dataZoom = [{show: false},
                {
                    type: "inside",
                    show: false
                }];
        }
        var planCourseCnt = [], startCourseRatioCnt = [], realCourseCnt = [];

        if (data.planCourseData) {
            for (var i = 0; i < data.planCourseData.length; i++) {
                planCourseCnt.push(data.planCourseData[i].scheduleCount);
            }
        }
        if (data.startCourseRatioData) {
            for (var i = 0; i < data.startCourseRatioData.length; i++) {
                startCourseRatioCnt.push((data.startCourseRatioData[i].ratio).toFixed(0));
            }
        }
        if (data.realCourseData) {
            for (var i = 0; i < data.realCourseData.length; i++) {
                realCourseCnt.push(data.realCourseData[i].scheduleCount);
            }
        }
        option7 =
        {
            "title": {
                "text": "",
                "subtext": "",
                x: "1%",
                y: '5%',
                textStyle: {
                    color: '#1bb4f9',
                    fontSize: '20',
                    fontFamily: 'PingFangBold'
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: '14'
                }
            },
            "tooltip": {
                "trigger": "axis",
                transitionDuration: 0,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 0,
                position: function (p) {
                    // 位置回调
                    return [p[0] - 80, 80];
                },
                padding: [5, 10],
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                },
                formatter: function (params) {
                    var res = '第' + (params[0].dataIndex + 1) + '周<br/>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        var seriesName = '';
                        var value = '';
                        if (params[i].seriesName == '实际开课') {
                            seriesName = '实际开课数';
                            value = params[i].value;
                        } else if (params[i].seriesName == '计划开课') {
                            seriesName = '计划开课数';
                            value = params[i].value;
                        } else if (params[i].seriesName == '实开课占比') {
                            seriesName = '实开课占比';
                            value = params[i].value + '%';
                        }
                        res += seriesName + ': ' + value + '<br>';
                    }
                    return res;
                }
            },
            "grid": {
                "borderWidth": 0,
                "left": '15',
                "right": '15',
                "top": '85',
                "bottom": '40',
                containLabel: true,
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                // x: 'right',
                itemWidth: 8,
                itemHeight: 12,
                top: '14',
                right: '12',
                itemGap: 10,
                textStyle: {
                    color: '#fff'
                },
                "data": ['实际开课', '计划开课', '实开课占比']
            },
            "calculable": true,
            "xAxis": [{
                "type": "category",
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                "axisLabel": {
                    // "interval": 0

                },
                "data": xData
            }],
            "yAxis": [
                {
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0
                    },
                    "splitArea": {
                        "show": false
                    }
                }, {
                    "name": "",
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }

                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        formatter: '{value} %',
                        show: true,
                        "interval": "auto"
                    },
                    "splitArea": {
                        "show": false
                    }

                }],
            dataZoom: dataZoom,
            "series": [{
                "name": "实际开课",
                "type": "bar",
                // "stack": "总量",
                "showAllSymbol": true,
                "symbol": 'circle',
                "symbolSize": 5,
                "barMaxWidth": 10,
                "barGap": "5%",
                "itemStyle": {
                    "normal": {
                        "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1ad1fc'
                        }, {
                            offset: 1,
                            color: '#1d79f3'
                        }]),
                        "label": {
                            "show": true,
                            "textStyle": {
                                "color": "#fff"
                            },
                            "position": "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": realCourseCnt
            },
                {
                    "name": "计划开课",
                    "showAllSymbol": true,
                    "symbol": 'circle',
                    "symbolSize": 5,
                    "type": "bar",
                    // "stack": "总量",
                    "barMaxWidth": 10,
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#4ed8a2'
                            }, {
                                offset: 1,
                                color: '#086c36'
                            }]),
                            "barBorderRadius": 0,
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#61defc"
                                },
                                "position": "top",
                                formatter: function (p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": planCourseCnt
                }, {
                    "name": "实开课占比",
                    "type": "line",
                    yAxisIndex: 1,
                    symbolSize: 8,
                    symbol: 'circle',
                    "itemStyle": {
                        "normal": {
                            "color": "#c47e26",
                            "barBorderRadius": 0,
                            "label": {
                                "show": false,
                                "position": "top",
                                formatter: function (p) {
                                    return (p.value * 100).toFixed(0) + ' %';
                                }
                            }
                        }

                    },
                    "data": startCourseRatioCnt
                }
            ]
        };
        echart7.setOption(option7);
    });
}

//-------------------授课分析
//故障情况
function courseAnalysis(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/getmalguideratiodata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, dataGZ = [], dataAll = 0;
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                dataGZ.push({value: data[i].catalogCnt, name: data[i].catalogName});
                dataAll += data[i].catalogCnt;
            }
            dataGZ[0].itemStyle = {
                normal: {
                    shadowBlur: 16,
                    shadowColor: 'rgba(255,148,148,0.6)',
                }
            };
            courseAnalysisSetOption(dataGZ, dataAll);
        } else {
            courseAnalysisSetOption([{value: 0, name: '故障数'}], 0);
        }
    });
}
function courseAnalysisSetOption(dataGZ, dataAll) {
    $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>故障总数</span>' + '<p>' + dataAll + '</p>');
    option8 = {
        title: {
            x: 'center',
            y: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['64', '80'],
                hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataGZ
            }
        ],
        color: ['#f54f41', '#4578f9', '#c367f4', '#44def3', '#f58260', '#e5b039']
    };
    echart8.setOption(option8);
    echart8.on('mouseout', function (params) {
        $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>故障总数</span>' + '<p>' + dataAll + '</p>');
    });
    echart8.on('mouseover', function (params) {
        var percent = (params.percent).toFixed(0) + '%';
        $('.teaching-analysis .echart-text li:nth-child(2)').html('<span>' + params.name + '</span>' + '<p>' + percent + '</p>');
    });
}
//开课情况
function scheduleClassStatus(validCourseCnt, invalidCourseCnt) {
    var dataSK = [], dataAll = 0;
    dataSK.push({
        value: validCourseCnt,
        name: '有效课时',
        type: 'valid',
        itemStyle: {
            normal: {
                borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1d69f1'
                }, {
                    offset: 1,
                    color: '#1ad1fc'
                }]),
                shadowBlur: 20,
                shadowColor: 'rgba(28,132,244,0.6)',
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#1d69f1'
                }, {
                    offset: 1,
                    color: '#1ad1fc'
                }]),
            }
        }
    });
    dataSK.push({
        value: invalidCourseCnt,
        name: '无效课时',
        type: 'invalid',
        itemStyle: {
            normal: {
                color: '#112958',
            }
        }
    });
    dataAll = validCourseCnt + invalidCourseCnt;
    $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>开课总数</span>' + '<p>' + dataAll + '</p>');
    option9 = {
        title: {
            text: '',
            textStyle: {
                color: '#fff',
                fontSize: '18'
            },
            x: 'center',
            y: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['64', '80'],
                hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataSK
            }
        ],
        color: ['#1ac9fb', '#112958']
    };
    echart9.setOption(option9);
    echart9.on('mouseout', function (params) {
        $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>开课总数</span>' + '<p>' + dataAll + '</p>');
    });
    echart9.on('mouseover', function (params) {
        var percent = (params.percent).toFixed(0) + '%';
        $('.teaching-analysis .echart-text li:nth-child(1)').html('<span>' + params.name + '</span>' + '<p>' + percent + '</p>');
    });
}
//本周情况
function thisWeek(baseAreaId) {
    $.get(BACK_ROOT + '/bigscreen/classroom/weekdata.do', {baseAreaId: baseAreaId}).done(function (data) {
        var data = data.result, Tpl = '', TplRate = '';
        if (data) {
            Tpl = '<span>' + data.validCourseCnt + '</span>' +
                '<span>' + data.planCourseCnt + '</span>';
            TplRate = '<span>' + data.masterRoomCnt + '</span>' +
                '<span>' + data.receiveRoomCnt + '</span>';
            $('.this-week-status .status_title span').html(data.validCourseRatio + '%');
            $('.use-rate .status_title span').html(data.usedRoomRatio + '%');
        } else {
            $('.this-week-status .status_title span').html('');
            $('.use-rate .status_title span').html('');
        }
        $('.this-week-status .data-count').html(Tpl);
        $('.use-rate .data-count').html(TplRate);
    });
}
//行政区和教师排行
function areaAndTeacherList(data, type) {
    if (data.length == 0) {
        $('.grand  .no-data').show();
        $('.grand .axisxy-title').hide();
        echart10.clear();
        return false;
    } else {
        $('.grand .no-data').hide();
        $('.grand .axisxy-title').show();
    }
    var areaName = [], realCourseCnt = [], planCourseCnt = [], CourseRate = [], maxCount = [];
    var fullAreaName = [];
    if (data) {
        for (var i = 0; i < data.length; i++) {
            if ('baseArea' == type) {
                areaName.push(strEllipsis(data[i].areaName, 8));
                fullAreaName.push(data[i].areaName);
            } else if ('teacher' == type) {
                areaName.push(strEllipsis(data[i].teacherUserName, 8));
                fullAreaName.push(data[i].teacherUserName);
            }

            realCourseCnt.push(data[i].realCourseCnt);
            planCourseCnt.push(data[i].planCourseCnt);
            CourseRate.push(( '(' + (data[i].realCourseCnt * 100 / data[i].planCourseCnt).toFixed(0)) + '%)');
        }
    }
    var maxPlanCourseCnt = Math.max.apply(null, planCourseCnt);
    var maxRealCourseCnt = Math.max.apply(null, realCourseCnt);
    var maxCourseCnt = Math.max(maxPlanCourseCnt, maxRealCourseCnt);
    $.each(data, function (i, d) {
        maxCount.push(maxCourseCnt);
    });
    option10 = {
        title: {
            text: '计划开课',
            left: '70',
            bottom: '-11',
            textStyle:{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12',
                fontfamily: 'PingFangMedium',
                fontWeight:'light'
            }

        },
        grid: {
            left: '29',
            top: '20',
            right: '28',
            bottom: '6',
            containLabel: true
        },
        tooltip: {
            show: "true",
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'none' // 默认为直线，可选为：'line' | 'shadow'
            },
            transitionDuration: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderColor: '#535b69',
            borderRadius: 8,
            borderWidth: 0,
            padding: [5, 10],
            formatter: function (param) {
                var html = fullAreaName[param[1].dataIndex] + '<br/>';
                html += '实际开课：' + param[0].value + '<br/>';
                html += '计划开课：' + planCourseCnt[param[1].dataIndex] + '<br/>';
                html += '开课占比：' + param[1].axisValue;
                return html;
            }
        },
        xAxis: {
            type: 'value',
            axisTick: {show: false},
            max: maxCourseCnt,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#90979c'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#1bb9f9'
                    }
                },
                axisLabel: {
                    fontSize: '16',
                    fontFamily: 'PingFangMedium',
                },
                data: areaName,
                offset: 57
            }, {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e9bc6'
                    }
                },
                axisLabel: {
                    fontSize: '14'
                },
                position: 'left',
                offset: 5,
                data: CourseRate,
                zLevel: '2'
            }, {
                type: 'category',
                axisTick: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#7e9bc6'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#fff',
                    interval: '0',
                    fontSize: '24',
                    fontFamily: 'myFirstFont'
                },
                position: 'right',
                offset: 10,
                data: realCourseCnt,
                zLevel: '3'
            }
        ],
        series: [
            {
                name: '计划开课',
                type: 'bar',
                yAxisIndex: 1,
                barWidth: '12',
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#09152a',
                        borderType: 'solid',
                        barBorderRadius: 50,
                        borderWidth: 1,
                        borderColor: '#61738c'
                    }
                },
                barGap: '0%',
                barCategoryGap: '20%',
                data: planCourseCnt
            },
            {
                name: '实际开课',
                type: 'bar',
                // yAxisIndex: 2,
                barWidth: '6',
                label: {
                    normal: {
                        show: false,
                        color: '#fff',
                        position: [320, -8],
                        fontSize: '24',
                        fontFamily: 'myFirstFont'
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#1bb2f9',
                        barBorderRadius: 50,
                        borderWidth: 0,
                        borderColor: '#333'
                    }
                },
                barGap: '0%',
                barCategoryGap: '20%',
                data: realCourseCnt,
                zLevel: '2'
            }
        ]
    };
    echart10.setOption(option10);
}