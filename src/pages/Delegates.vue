<template>
  <div class="tab-panel-container row ">
    <div v-if="delegates" class="col-12 shadow-1">
      <q-table :data="delegates" :filter="filter" color="primary"
      selection="multiple" :selected.sync="selected" row-key="address"
      :columns="columns"  @request="request" :pagination.sync="pagination" 
      :loading="loading" :title="$t('TOTAL_PEOPLES',{count:pagination.rowsNumber})"
      :rows-per-page-options="[10]"
      >
      
        <template slot="top-right" slot-scope="props">
          <q-btn v-if="selected.length" color="positive" flat round  icon="thumb up" @click="vote" >
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]">{{$t('TRS_TYPE_VOTE')}}</q-tooltip>
          </q-btn>
          <q-btn flat round  icon="refresh" color="primary" @click="refresh" >
          </q-btn>
          <q-btn flat round  color="primary" :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" >
          </q-btn>
        </template>
          
        <q-td slot="body-cell-address"  slot-scope="props" :props="props">
          <div class="text-primary" @click="viewAccountInfo(props.row)">
            {{props.value}}
          </div>
        </q-td>
        <q-td slot="body-cell-nickname"  slot-scope="props" :props="props">
          {{props.value}}
        </q-td>
        <q-td slot="body-cell-approval"  slot-scope="props" :props="props">
          {{props.value | approval}}
        </q-td>
      </q-table>
    </div>
    <q-dialog v-model="dialogShow" prevent-close @ok="onOk" @cancel="onCancel">

    <span slot="title">{{$t('VOTE_TITLE')}}</span>
    <span slot="message">{{$t('VOTE_TIP')}}
      <br/>
      {{$t('OPERATION_REQUIRES_FEE')+'0.1 XAS'}}
    </span>
      <div slot="body">
        <q-field v-if="secondSignature"
          :label="$t('TRS_TYPE_SECOND_PASSWORD')"
          :error-label="$t('ERR_TOAST_SECONDKEY_WRONG')"
          :label-width="4"
        >
          <q-input v-model="secondPwd" type="password" />
        </q-field>
       <table class="q-table horizontal-separator highlight loose ">
          <tbody class='info-tbody'>
             <tr>
              <td >{{$t('DAPP_NAME')}}</td>
              <td >{{$t('ADDRESS')}}</td>
            </tr>
            <tr v-for="delegate in selected" :key="delegate.address">
              <td >{{delegate.name}} <q-icon v-if="delegate.voted" name="check circle" color="positive"/></td>
              <td >{{delegate.address}} </td>
            </tr>
          </tbody>
        </table>
        </div>
      <template slot="buttons" slot-scope="props">
        <q-btn  flat color="primary" :label="$t('label.cancel')" @click="props.cancel" />
        <q-btn  flat color="primary" :label="$t('label.ok')" @click="props.ok" />
      </template>
    </q-dialog>
  </div>
</template>

<script>
import { toast, translateErrMsg } from '../utils/util'
import { createVote } from '../utils/asch'
import { mapActions } from 'vuex'
import { QIcon, QTable, QBtn, QField, QTd, QInput, QTooltip } from 'quasar'

export default {
  props: ['userObj'],
  components: { QIcon, QTable, QBtn, QField, QTd, QInput, QTooltip },
  data() {
    return {
      delegates: null,
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      selected: [],
      filter: '',
      loading: false,
      columns: [
        {
          name: 'rate',
          label: this.$t('RANKING'),
          field: 'rate',
          align: 'center'
        },
        {
          name: 'nickname',
          label: this.$t('DELEGATE'),
          field: 'name',
          type: 'string'
        },
        {
          name: 'address',
          label: this.$t('ADDRESS'),
          field: 'address'
        },
        {
          name: 'productivity',
          label: this.$t('PRODUCTIVITY'),
          field: 'productivity'
        },
        {
          name: 'producedblocks',
          label: this.$t('PRODUCED_BLOCKS'),
          field: 'producedblocks',
          align: 'center',
          type: 'number'
        },
        {
          name: 'approval',
          label: this.$t('APPROVAL'),
          field: 'approval'
        }
      ],
      dialogShow: false,
      dialog: {
        title: '',
        message: ''
      },
      secondPwd: ''
    }
  },
  methods: {
    ...mapActions(['delegates', 'broadcastTransaction']),
    refresh() {
      this.pagination = this.paginationDeafult
      this.getDelegates()
    },
    async request(props) {
      await this.getDelegates(props.pagination, props.filter)
    },
    async getDelegates(pagination = {}, filter = '') {
      this.loading = true
      if (pagination.page) this.pagination = pagination
      let limit = this.pagination.rowsPerPage
      let pageNo = this.pagination.page
      let res = await this.delegates({
        address: this.user.account.address,
        orderBy: 'rate:asc',
        limit: limit,
        offset: (pageNo - 1) * limit
      })
      this.delegates = res.delegates
      // set max
      this.pagination.rowsNumber = res.totalCount
      this.loading = false
      return res
    },
    viewAccountInfo(row) {
      this.$root.$emit('openAccountModal', row.address)
    },
    info(msg) {
      toast(msg)
    },
    async onOk() {
      if (this.selectedDelegate.length === 0) {
        this.selected = []

        return
      }
      let trans = createVote(this.selectedDelegate, this.user.secret, this.secondPwd)
      let res = await this.broadcastTransaction(trans)
      if (res.success === true) {
        toast(this.$t('INF_VOTE_SUCCESS'))
      } else {
        translateErrMsg(this.$t, res.error)
      }
      this.secondPwd = ''
    },
    onCancel() {
      this.secondPwd = ''
    },
    vote() {
      this.dialogShow = true
    },
    disableBtn(model) {
      this[model] = true
      this._.delay(() => {
        this[model] = false
      }, 3000)
    }
  },
  async mounted() {
    if (this.user) {
      this.getDelegates()
    }
  },
  computed: {
    user() {
      return this.userObj
    },
    secondSignature() {
      return this.user ? this.user.account.secondPublicKey : null
    },
    paginationDeafult() {
      return {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    },
    selectedDelegate() {
      let selected = this.selected.filter(d => {
        return !d.voted
      })
      return selected.map(delegate => {
        return '+' + delegate.publicKey
      })
    }
  },
  watch: {
    userInfo(val) {
      if (val) {
        this.getDelegates()
      }
    },
    pageNo(val) {
      this.getDelegates()
    }
  }
}
</script>

<style lang="stylus" scoped>
pd-5 {
  padding: 5%;
}
</style>
