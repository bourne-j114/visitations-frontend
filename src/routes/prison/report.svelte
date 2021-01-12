<script context="module">
    export async function preload({params}, {user}) {
        if (user) {
            this.redirect(302, `/`);
        }
    }
</script>

<script>
    import { stores} from '@sapper/app';
    import * as api from 'api.js';

    const {session} = stores();
    let prison = {
        prison_id: "",
        gender: "m",
        first_name: "",
        last_name: "",
        nick_name: "",
        birth_day: "",
        prison_type: 1,
        remark: "",
        id_card: "",
        address_no: "",
        moo: "",
        subdistric: "",
        distric: "",
        province: "",
        nation: "",
        race: "",
        nationality: "",
        religion: "",
        blame: "",
        education: "",
        edu_institution: "",
        status: "",
        child: 0,
        sibling: 0,
        child_in_a_child: 0,
        home_owner: "",
        stay_address_no: "",
        stay_moo: "",
        stay_subdistric: "",
        stay_distric: "",
        stay_province: "",
        occupation: "",
        income: "",
        history_punish: "",
        history_punish_year: "",
        history_punish_month: "",
        history_punish_day: "",
        prove_pass_num: "",
        cur_num: ""
    };
   let case_detail = {
        prison_id: "",
        court_order: "",
        case_no: "",
        case_detail: "",
        police_station: "",
        catch_date: "",
        receive_date: "",
    };
    let prison_id = "5631200038";
    let errors;
    let options = [];
    let selectedOption;

    $: getPrisonInfo();

    async function getPrisonInfo() {
      //  prison_id = prison.prison_id;
        prison = null;
        let query = `prisons/getinfo/${prison_id}`;
        ({case_detail,prison} = await api.get(query, $session.user && $session.user.token));
    }
</script>

<svelte:head>
    <title>รายงาน</title>
</svelte:head>

<style type="text/css">
    html {
        background: white;
        color: black;
        font: 16px Tahoma;
    }
    body {
        margin: 2em auto;
        max-width: 760px;
        width: 65%;
    }
    section {
        clear: both;
        margin-top: 3em;
    }
    li {
        list-style-type: disc;
    }
    section > ul > li,
    header > ul > li {
        list-style-type: none;
        margin-bottom: .5em;
    }


    @media (max-width: 776px) {
        ul {
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
        }
    }
    @media print {
        html {
            color: black;
            font-size: 16px;
        }
        body {
            margin: 1.5em;
            width: 90%;
        }
        section {
            margin-top: 1em;
        }
    }
</style>
{#if  prison}
<h5 class="text-xs-center">แบบสอบประวัติและการจัดทำทะเบียนผู้เข้าการตรวจพิสูจน์</h5>
<section>
    <h5>สถานที่ควบคุมตัว สถานที่เพื่อการตรวจพิสูจน์จังหวัดสระแก้ว</h5>
    <ul id="header-left" title="mail and phone">
        <li>หมายเลขคดี:{case_detail.case_no} คำสั่งศาล:{case_detail.court_order}</li>
        <li>พฤติการณ์และสาเหตุการกระทำผิด: {case_detail.case_detail}</li>
        <li>สน.ท้องที่: {case_detail.police_station}</li>
        <li>ถูกจับเมื่อวันที่:  {case_detail.catch_date} รับตัวเมื่อวันที่: {case_detail.receive_date}</li>
    </ul>
</section>
<section id="info">
    <ul>
        <li>
            <h5>ประวัติทางสังคมของผู้เข้ารับการตรวจพิสูจน์</h5>
            <ul>
                <li>ชื่อ: <strong>{prison.first_name}</strong>  นามสกุล:  <strong>{prison.last_name}</strong>  ชื่อเล่น: <strong>{prison.nick_name}</strong></li>
                <li>เพศ: <strong>{#if prison.gender === "m"} ชาย {:else} หญิง{/if}</strong> เลขบัตรประชาชน: {prison.id_card} </li>
                <li>เชื้อชาติ: {prison.race} สัญชาติ: {prison.nationality}  ศาสนา: {prison.religion}</li>
                <li>ตำหนิ: {prison.blame}</li>
                <li>วัน เดือน ปี เกิด: {prison.birth_day} อายุ: - </li>

            </ul>
        </li>
        <li>
            <h5>ที่อยู่ตามทะเบียนบ้าน</h5>
            <ul>
                <li>บ้านเลขที่: {prison.address_no}  หมู่ที่: {prison.moo}  ตำบล: {prison.subdistric}</li>
                <li>อำเภอ: {prison.distric} จังหวัด: {prison.province}</li>
            </ul>
        </li>
        <li>
            <h5>ที่อยู่ปัจจุบัน</h5>
            <ul>
                <li> บ้านเลขที่: {prison.stay_address_no}   หมู่ที่: {prison.stay_moo} ตำบล: {prison.stay_subdistric}</li>
                <li>อำเภอ:{prison.stay_distric}   จังหวัด: {prison.stay_province}</li>
            </ul>
        </li>
        <li>
            <h5>ข้อมูลบุตร</h5>
            <ul>
                <li>สถานภาพ: {prison.status} จำนวนบุตร: {prison.child}</li>
                <li>มีพี่น้องร่วม: {prison.sibling} คน  เป็นบุตรคนที่: {prison.child_in_a_child}  พักอาศัยบ้านของ: {prison.home_owner}</li>
            </ul>
        </li>
        <li>
            <h5>ประวัติการต้องโทษ</h5>
            <ul>
                <li>ประวัติการต้องโทษ: {prison.history_punish} ปี {prison.history_punish_month}  เดือน {prison.history_punish_day} วัน</li>
            </ul>
        </li>
        <li>
            <h5>อาชีพ</h5>
            <ul title="occupation">
                <li>อาชีพ: {prison.occupation} รายได้: {prison.income} บาท</li>
            </ul>
        </li>
        <li>
            <h5>การศึกษา</h5>
            <ul title="education">
                <li>ระดับการศึกษา: {prison.education} ชื่อที่อยู่สถานศึกษา: {prison.edu_institution}</li>
            </ul>
        </li>
        <li>
            <h5>การจตรวจพิสูจน์</h5>
            <ul title="education">
                <li>จำนวนครั้งที่ผ่านการตรวจพิสูจน์:  {prison.prove_pass_num} ครั้ง   เคยผ่านการบำบัด: {prison.cur_num} ครั้ง</li>
            </ul>
        </li>
    </ul>
</section>

{/if}