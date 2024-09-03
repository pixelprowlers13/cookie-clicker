using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace cookie_clicker_c_
{
    
    public partial class Form1 : Form
    {
        private int clicks = 0;
        public Form1()
        {
            InitializeComponent();

        }

        private void click_Click(object sender, EventArgs e)
        {
            clicks += 1;
            label1.Text = "clicks: " + clicks.ToString();

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
