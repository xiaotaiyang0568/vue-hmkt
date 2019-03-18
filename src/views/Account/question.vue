<template>
  <div class="main">
    <mt-header title="常见问题" :fixed="true" style="margin-bottom: 1.8rem"></mt-header>
    <div class="contain">
      <div class="content" v-for="item in questionList" :key="item.no">
        <div class="title" :style="item.style">
          <span class="span-ques">{{item.label}}: {{item.question}}</span>
        </div>
        <div class="answer">
          <p class="span-answer">{{item.answer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const style1 = 'background-color: #f2f4f7; color: #666; font-size: 0.4rem;'
  const style2 = 'background-color: rgb(85, 139, 2); color: #fff; font-size: 0.4rem;'
  export default {
    mounted () {
      console.log('mounted')
    },
    data () {
      return {
        questionList: [
          {
            no: 1,
            style: style1,
            label: '一',
            question: '常佑康结直肠癌筛查的理论依据是什么？',
            answer: '粪便从肠道排出的过程中，肠壁上微小的组织细胞会持续脱落，并且留存在粪便中。这些组织细胞中含有病变，甚至癌变的基因变化信号。这些信号能通过高精度的分子检测手段被检出。经过前期临床研究大量数据证明，这种方法可以在结直肠癌发展的早期，甚至在癌前病变时期，报告出相应的病变信号。因此成为结直肠癌无创筛查的新途径。'
          },
          {
            no: 2,
            style: style2,
            label: '二',
            question: '常佑康检测准确率有多少？',
            answer: '根据前期样本进行结肠镜检查和粪便DNA样品检测的双盲对照研究得出常佑康的检查灵敏度可以达到：	 1、 I-II期结直肠癌患者检出率88%	 2、大于1cm腺瘤样息肉者检出率>50%	 3、健康人群中特异性约90%.'
          },
          {
            no: 3,
            style: style1,
            label: '三',
            question: '哪些人适合做常佑康检测？',
            answer: '1、有肠道肿瘤家族史的人群 2、	肿瘤高发地区40岁以上人群 3、	长期患有慢性肠道炎症、腹泻、粪便不成形等症状的人群        4、	本人患有其他肿瘤，预防肠道转移的人群        5、	有盆腔放疗史、慢行胆道疾病史或胆囊切除史等人群       6、	40岁以上关注肠道健康的人群，特别是久坐人群        '
          },
          {
            no: 4,
            style: style2,
            label: '四',
            question: '常佑康在哪里检测，是否有自己的检测中心？',
            answer: '在上海吉凯医学检验所检测。          该检验所是上海吉凯基因化学技术有限公司的全资子公司。吉凯基因自2002年成立至今，经过多年努力逐步建立了一套完整的基因功能研究和服务平台， 拥有具有自主知识产权的核心技术体系，具体包括：RNAi 技术、基因过表达技术、慢病毒包装技术，基因修饰和编辑技术以及基因组检测技术等。吉凯基因拥有近8000平米的实验研究场地、SPF级实验动物房及cGMP车间；承担并完成科技部、上海市科委等研究课题30余项，10 余年来共主持国家科技部、上海市科委、上海市经委支持的疾病诊疗基因靶标研究相关课题 27 项；其中包含 863 科研项目 2 项；上海科委生物医药重大专项 2 项；上海市生物医药产业化项目 4 项。申请发明专利100余项，是上海市专利试点企业，上海市科技小巨人企业，高新技术企业，获批建立了上海吉凯基因转化医学研究院、上海肿瘤药物基因靶标工程技术研究中心、院士专家工作站等。'
          },
          {
            no: 5,
            style: style1,
            label: '五',
            question: '常佑康检测能不能替代肠镜？',
            answer: '根据《中国结直肠肿瘤早诊筛查策略专家共识 （2018版） 》早期肠癌的筛查手段包含了粪便隐血试验，粪便DNA检测（常佑康属于此类），风险调研评估表和肠镜。            各个筛查方法之间有各自的优劣势。随着基因技术的不断发展、完善，粪便DNA检测在筛查领域的优势越来越明显，这种筛查方案不仅无创无痛，而且操作很便捷，同时在受检者的隐私保护和舒适性上也让肠镜无法比拟。但这些优势是基于筛查层面的，并非确诊和治疗层面，所以在临床诊断和治疗方面，肠镜目前是无法被替代的。在筛查中发生的任何阳性病例，都需要肠镜进行确诊。近来有专家提出新的观点：肠镜是治疗手段，不是常规筛查手段。也从侧面说明学术界开始对肠镜用于常规筛查提出了不同意见。综上所述：肠癌的常规筛查可以不再依赖肠镜，可以逐步被其他更好的方法学取代，但确诊和治疗尚无方法可以取代肠镜。'
          },
          {
            no: 6,
            style: style1,
            label: '六',
            question: '常佑康的优势有哪些？',
            answer: '1、无创无痛更隐私：常佑康检测只需要居家采集5-10g粪便即可完成检测，既无痛苦也无风险，而且很好的保护了个人隐私，避免尴尬。而肠镜检查需要清肠，加上漫长的等待后，器物侵入性检查，痛苦又尴尬，不适合作为常规筛查方案。              2、灵敏客观更早期：随着分子检测技术的发展，粪便DNA检测越来越灵敏，同时，检测过程和数据判读不依赖人，避免了人为的主观误差。可以更早更准发现早期肠道病变。3、免费复检有保险：参加常佑康检测的受检者，无论结果是高风险或一般风险，均有完善的售后保障，免费复检或赠送保险，免除了受检者后顾之忧。（详见购买协议）'
          },
          {
            no: 7,
            style: style2,
            label: '七',
            question: '如何保障用户的个人隐私？',
            answer: '上海吉凯医学检验所作为卫计委批准许可的医疗机构，严格遵守国家和行业的相关法律法规。我们在内部管理方面严格制定规章制度，对每一份报告的个人信息予以严格保密，杜绝个人健康信息的泄漏。                '
          },
          {
            no: 8,
            style: style1,
            label: '八',
            question: '多久可以拿到报告？网上可以查询结果吗？',
            answer: '实验室收到合格标本后的五个工作日内，节假日顺延。如果有特殊情况将在网上商城和检验所官网上提前通知。并且我们提供了网上报告查询系统，可以及时在线查看报告，详见《吉凯健康商城》报告查询。'
          },
          {
            no: 9,
            style: style2,
            label: '九',
            question: '检测结果是否值得信赖？',
            answer: '本检测属于体外检测项目，仅对收到的样本负责。本检测项目具有严格的质量控制，检测结果的可靠性有记录控制。如果存在有报告瑕疵的可能，我们将要求受检者重新提供一次样本，进行免费复测。和任何一种医疗技术一样，本检测本身存在局限性，我们将这些局限性在报告中予以详细说明。'
          },
          {
            no: 10,
            style: style1,
            label: '十',
            question: '保险报销流程是怎么样的？',
            answer: '当您收到常佑康检测报告显示一般风险时，我们已经在中国人寿保险公司为您购买了一份保险，即1年内（报告签发日起）经二级甲等或以上级别医院确诊为结直肠癌的，可以联系吉凯客服申请理赔。理赔金额根据病理分期而定（详见保单）。理赔所需材料大致包括：本人身份证复印件，病理报告原件（核查完归还）及复印件；常佑康报告单复印件；指尖血干血片（DNA身份核验）；银行卡复印件等。                我们将有专业客服帮您办理每一道程序，直至理赔结束。'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .main{
    height: 18rem;
    overflow: auto;
  }
  .contain{
    margin-top:1.5rem;
    display: flex;
    flex-direction: column;
    width:100%;
    align-items: center;
    margin-bottom:0.3rem;
  }
  .content{
    margin-top: 0.6rem;
    width:92%;
    /*height: 6rem;*/
    border-radius: 0.5rem;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
  .title{
    width:100%;
    height: 1.5rem;
    /*border-bottom: 1px solid gainsboro;*/
    /*background-color: #f2f4f7;*/
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    line-height: 1.5rem;
  }
  .answer{
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    /*height: 4.5rem;*/
    overflow: auto;
  }
  .span-ques{
    padding-left:0.5rem;
  }
  .span-answer{
    /*padding-top:0.3rem;*/
    font-size:0.35rem;
    padding: 0 0.3rem;
  }
</style>